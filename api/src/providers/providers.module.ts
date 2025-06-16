import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, JwtModule],
  providers: [],
  exports: [],
})
export class ProvidersModule {}
