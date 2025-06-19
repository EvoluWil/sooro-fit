import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/enums/user-status.enum';
import { bmiCalculator } from 'src/utils/bmi-calculator';
import { roleValidator } from 'src/utils/role-validator';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { BmiQueryParams } from './bmi-assessment.controller';
import { CreateBmiAssessmentDto } from './dto/create-bmi-assessment.dto';
import { UpdateBmiAssessmentDto } from './dto/update-bmi-assessment.dto';
import { BmiAssessment } from './entities/bmi-assessment.entity';

@Injectable()
export class BmiAssessmentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(BmiAssessment)
    private readonly bmiAssessmentRepository: Repository<BmiAssessment>,
  ) {}

  async create(
    createBmiAssessmentDto: CreateBmiAssessmentDto,
    evaluatorId: string,
  ) {
    const { studentId, height, weight } = createBmiAssessmentDto;

    const student = await this.userRepository.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Aluno não encontrado');
    }

    if (student.status === UserStatus.INACTIVE) {
      throw new NotFoundException('Aluno não está ativo');
    }

    const evaluator = await this.userRepository.findOne({
      where: { id: evaluatorId },
    });

    if (!evaluator) {
      throw new NotFoundException('Avaliador não encontrado');
    }

    const bmiData = bmiCalculator.calculate(height, weight);

    const bmiAssessment = this.bmiAssessmentRepository.create({
      ...bmiData,
      height,
      weight,
      student,
      evaluator,
    });

    await this.bmiAssessmentRepository.save(bmiAssessment);

    return {
      ok: true,
      message: 'Avaliação de IMC criada com sucesso',
    };
  }

  async findAll(authUserId: string, query?: BmiQueryParams) {
    const user = await this.userRepository.findOne({
      where: { id: authUserId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const qb = this.bmiAssessmentRepository
      .createQueryBuilder('bmi')
      .leftJoinAndSelect('bmi.student', 'student')
      .leftJoinAndSelect('bmi.evaluator', 'evaluator');

    if (roleValidator.isStudentOnly(user)) {
      qb.where('student.id = :authUserId', { authUserId });
      return qb.getMany();
    }

    if (roleValidator.isTeacherOnly(user)) {
      qb.where('evaluator.id = :authUserId', { authUserId });

      if (query?.studentId) {
        const exists = await this.bmiAssessmentRepository.findOne({
          where: {
            student: { id: query.studentId },
            evaluator: { id: authUserId },
          },
        });

        if (!exists) {
          throw new NotFoundException(
            'Aluno não encontrado ou sem vínculo com este professor',
          );
        }

        qb.andWhere('student.id = :studentId', {
          studentId: query.studentId,
        });
      }
      return qb.getMany();
    }

    if (roleValidator.isAdmin(user)) {
      const where: string[] = [];
      const params: Record<string, string> = {};

      if (query?.studentId) {
        where.push('student.id = :studentId');
        params.studentId = query.studentId;
      }

      if (query?.teacherId) {
        where.push('evaluator.id = :teacherId');
        params.teacherId = query.teacherId;
      }

      if (where.length > 0) {
        qb.where(where.join(' AND '), params);
      }

      return qb.getMany();
    }
    return [];
  }

  async update(
    id: string,
    updateBmiAssessmentDto: UpdateBmiAssessmentDto,
    userId: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const bmiAssessment = await this.bmiAssessmentRepository.findOne({
      where: {
        id,
        evaluator: roleValidator.isAdmin(user) ? undefined : { id: userId },
      },
    });

    if (!bmiAssessment) {
      throw new NotFoundException('Avaliação de IMC não encontrada');
    }

    const bmiData = bmiCalculator.calculate(
      updateBmiAssessmentDto.height,
      updateBmiAssessmentDto.weight,
    );

    await this.bmiAssessmentRepository.update(id, {
      ...updateBmiAssessmentDto,
      ...bmiData,
    });

    return {
      ok: true,
      message: 'Avaliação de IMC atualizada com sucesso',
    };
  }

  async remove(id: string) {
    const bmiAssessment = await this.bmiAssessmentRepository.findOne({
      where: { id },
    });

    if (!bmiAssessment) {
      throw new NotFoundException('Avaliação de IMC não encontrada');
    }

    await this.bmiAssessmentRepository.remove(bmiAssessment);

    return {
      ok: true,
      message: 'Avaliação de IMC removida com sucesso',
    };
  }
}
