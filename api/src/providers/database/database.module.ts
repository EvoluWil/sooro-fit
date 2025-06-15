import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(databaseProviders)],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
