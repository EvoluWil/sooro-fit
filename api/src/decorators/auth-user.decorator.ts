import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User } from 'src/@types/user.type';

export const AuthUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    return plainToClass(User, request.user);
  },
);
