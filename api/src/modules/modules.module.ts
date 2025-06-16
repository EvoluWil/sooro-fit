import { Module } from '@nestjs/common';
import { BmiAssessmentModule } from './bmi-assessment/bmi-assessment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, BmiAssessmentModule],
})
export class ModulesModule {}
