import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { defaultPlainToClass } from 'src/utils/default-plain-to-class';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ password, ...rest }: CreateUserDto) {
    const usernameExists = await this.userRepository.findOne({
      where: { username: rest.username },
    });

    if (usernameExists) {
      throw new ConflictException(
        'Já existe um usuário com esse nome de usuário',
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({ ...rest, password: hash });
    await this.userRepository.save(user);

    return { ok: true, message: 'Usuário criado com sucesso' };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return defaultPlainToClass(FindUserDto, users);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return defaultPlainToClass(FindUserDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.update(id, updateUserDto);
    return { ok: true, message: 'Usuário atualizado com sucesso' };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
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
