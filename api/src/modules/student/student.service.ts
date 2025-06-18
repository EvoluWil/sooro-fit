import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums/user-role.enum';
import { defaultPlainToClass } from 'src/utils/default-plain-to-class';
import { Repository } from 'typeorm';
import { FindUserDto } from '../user/dto/find-user.dto';
import { User } from '../user/entities/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ password, ...rest }: CreateStudentDto) {
    const usernameExists = await this.userRepository.findOne({
      where: { username: rest.username },
    });

    if (usernameExists) {
      throw new ConflictException(
        'Já existe um usuário com esse nome de usuário',
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...rest,
      role: UserRole.STUDENT,
      password: hash,
    });
    await this.userRepository.save(user);

    return { ok: true, message: 'Usuário criado com sucesso' };
  }

  async findAll() {
    const users = await this.userRepository.find({
      where: { role: UserRole.STUDENT },
    });
    return defaultPlainToClass(FindUserDto, users);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, role: UserRole.STUDENT },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return defaultPlainToClass(FindUserDto, user);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const user = await this.userRepository.findOne({
      where: { id, role: UserRole.STUDENT },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.update(id, updateStudentDto);
    return { ok: true, message: 'Usuário atualizado com sucesso' };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id, role: UserRole.STUDENT },
      relations: ['assessments'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.assessments?.length > 0) {
      throw new ConflictException(
        'Não é possível remover um usuário com avaliações associadas',
      );
    }

    await this.userRepository.delete(id);
    return { ok: true, message: 'Usuário removido com sucesso' };
  }
}
