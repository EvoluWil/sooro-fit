import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { BmiAssessmentController } from './bmi-assessment.controller';
import { BmiAssessmentService } from './bmi-assessment.service';
import { BmiAssessment } from './entities/bmi-assessment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BmiAssessment])],
  controllers: [BmiAssessmentController],
  providers: [BmiAssessmentService],
})
export class BmiAssessmentModule {}
