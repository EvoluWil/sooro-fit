import { Injectable } from '@nestjs/common';
import { CreateBmiAssessmentDto } from './dto/create-bmi-assessment.dto';
import { UpdateBmiAssessmentDto } from './dto/update-bmi-assessment.dto';

@Injectable()
export class BmiAssessmentService {
  create(createBmiAssessmentDto: CreateBmiAssessmentDto) {
    return 'This action adds a new bmiAssessment';
  }

  findAll() {
    return `This action returns all bmiAssessment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bmiAssessment`;
  }

  update(id: number, updateBmiAssessmentDto: UpdateBmiAssessmentDto) {
    return `This action updates a #${id} bmiAssessment`;
  }

  remove(id: number) {
    return `This action removes a #${id} bmiAssessment`;
  }
}
