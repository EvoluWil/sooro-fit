import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UserStatus } from 'src/enums/user-status.enum';
import { FindUserDto } from 'src/modules/user/dto/find-user.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { defaultPlainToClass } from 'src/utils/default-plain-to-class';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './entities/auth.entity';

const TWENTY_MINUTES = 1000 * 60 * 20;
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    private readonly jwtService: JwtService,
  ) {}
  private generateAccessToken(id: string, username: string) {
    const payload = { id, username };
    const token = this.jwtService.sign(payload);
    return token;
  }

  private async createSession(userId: string) {
    const refreshToken = randomBytes(64).toString('hex');
    const expireAt = new Date(Date.now() + SEVEN_DAYS);

    await this.authRepository.insert({
      expireAt,
      refreshToken,
      user: { id: userId },
    });
    return { refreshToken };
  }

  async signIn(signInDto: SignInDto, validateOnly = false) {
    const { username, password } = signInDto;
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new BadRequestException('Usuário ou senha incorretos');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new ForbiddenException(
        'Usuário sem permissão para acessar o sistema',
      );
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new BadRequestException('Usuário ou senha incorretos');
    }

    if (validateOnly) {
      return { user: defaultPlainToClass(FindUserDto, user) };
    }

    const accessToken = this.generateAccessToken(user.id, user.username);
    const session = await this.createSession(user.id);

    return {
      user: defaultPlainToClass(FindUserDto, user),
      accessToken,
      expiresAt: Date.now() + TWENTY_MINUTES,
      refreshToken: session.refreshToken,
    };
  }

  async getMe(authUserId: string) {
    const user = await this.userRepository.findOne({
      where: { id: authUserId },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return defaultPlainToClass(FindUserDto, user);
  }

  async refreshToken(refreshToken: string) {
    const auth = await this.authRepository.findOne({
      where: { refreshToken },
      relations: ['user'],
    });

    if (!auth || auth.expireAt < new Date()) {
      throw new BadRequestException('Refresh token inválido ou expirado');
    }

    const newRefreshToken = randomBytes(64).toString('hex');
    const newExpireAt = new Date(Date.now() + SEVEN_DAYS);

    await this.authRepository.update(
      { id: auth.id },
      {
        refreshToken: newRefreshToken,
        expireAt: newExpireAt,
      },
    );

    const accessToken = this.generateAccessToken(
      auth.user.id,
      auth.user.username,
    );

    return {
      accessToken,
      expiresAt: Date.now() + TWENTY_MINUTES,
      refreshToken: newRefreshToken,
    };
  }

  async signOut(authUserId: string) {
    await this.authRepository.delete({ user: { id: authUserId } });
    return { ok: true, message: 'Sessão encerrada com sucesso' };
  }
}
