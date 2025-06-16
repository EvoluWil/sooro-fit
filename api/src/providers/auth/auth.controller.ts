import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/@types/user.type';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { IsPublic } from 'src/decorators/public.decorator';
import { YupValidationPipe } from 'src/pipes/yup.pipe';
import { AuthService } from './auth.service';
import { RefreshTokenDto, RefreshTokenSchema } from './dto/refresh-token.dto';
import { SignInDto, SignInSchema } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('sign-in')
  signIn(@Body(new YupValidationPipe(SignInSchema)) signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('me')
  getMe(@AuthUser() authUser: User) {
    return this.authService.getMe(authUser.id);
  }

  @IsPublic()
  @Post('refresh-token')
  refreshToken(
    @Body(new YupValidationPipe(RefreshTokenSchema))
    refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('sign-out')
  signOut(@AuthUser() authUser: User) {
    return this.authService.signOut(authUser.id);
  }
}
