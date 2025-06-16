import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.modules';

@Module({
  imports: [DatabaseModule, AuthModule, JwtModule],
  providers: [],
  exports: [],
})
export class ProvidersModule {}
