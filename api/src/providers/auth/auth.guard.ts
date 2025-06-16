import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { IS_ADMIN_KEY } from 'src/decorators/system-admin.decorator';
import { IS_TEACHER_KEY } from 'src/decorators/teacher.decorator';
import { User } from 'src/modules/user/entities/user.entity';
import { roleValidator } from 'src/utils/role-validator';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isTeacher = this.reflector.getAllAndOverride<boolean>(
      IS_TEACHER_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token && !isPublic) {
      throw new UnauthorizedException('Token não enviado');
    }

    try {
      if (!token) {
        if (isPublic) {
          return true;
        }
        throw new UnauthorizedException('Token não enviado');
      }

      const { id, user: username } = await this.jwtService.verifyAsync(token);
      if (isAdmin || isTeacher) {
        const user = await this.userRepository.findOne({
          where: { id },
        });

        if (!user) {
          throw new UnauthorizedException('Usuário não encontrado');
        }

        if (isAdmin && !roleValidator.isAdmin(user)) {
          throw new UnauthorizedException('Usuário não autorizado');
        }

        if (isTeacher && !roleValidator.isTeacher(user)) {
          throw new UnauthorizedException('Usuário não autorizado');
        }
      }

      request.user = { id, user: username };
    } catch (err) {
      throw new UnauthorizedException('Usuário não autorizado');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      return undefined;
    }

    const [type, token] = parts;
    return type === 'Bearer' ? token : undefined;
  }
}
