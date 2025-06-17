import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/enums/user-status.enum';
import { bmiCalculator } from 'src/utils/bmi-calculator';
import { roleValidator } from 'src/utils/role-validator';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
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

  async create(createBmiAssessmentDto: CreateBmiAssessmentDto) {
    const { studentId, evaluatorId, height, weight } = createBmiAssessmentDto;

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
      student,
      evaluator,
    });

    await this.bmiAssessmentRepository.save(bmiAssessment);

    return {
      ok: true,
      message: 'Avaliação de IMC criada com sucesso',
    };
  }

  async findAll(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['assessments'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (roleValidator.isStudent(user)) {
      return user.assessments;
    }

    if (roleValidator.isAdmin(user)) {
      return this.bmiAssessmentRepository.find();
    }

    if (roleValidator.isTeacher(user)) {
      return this.bmiAssessmentRepository.find({
        where: { evaluator: { id: userId } },
      });
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

    await this.bmiAssessmentRepository.update(id, updateBmiAssessmentDto);

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
