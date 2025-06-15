import { Module } from '@nestjs/common';
import { BmiAssessmentService } from './bmi-assessment.service';
import { BmiAssessmentController } from './bmi-assessment.controller';

@Module({
  controllers: [BmiAssessmentController],
  providers: [BmiAssessmentService],
})
export class BmiAssessmentModule {}
