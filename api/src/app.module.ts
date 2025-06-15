import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersModule } from './providers/providers.module';
import { UserModule } from './modules/user/user.module';
import { BmiAssessmentModule } from './modules/bmi-assessment/bmi-assessment.module';
@Module({
  imports: [ProvidersModule, UserModule, BmiAssessmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
