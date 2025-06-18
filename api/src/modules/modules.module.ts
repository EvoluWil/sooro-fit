import { Module } from '@nestjs/common';
import { BmiAssessmentModule } from './bmi-assessment/bmi-assessment.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [UserModule, BmiAssessmentModule, StudentModule],
})
export class ModulesModule {}
