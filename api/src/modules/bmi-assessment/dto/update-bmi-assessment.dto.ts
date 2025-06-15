import { PartialType } from '@nestjs/mapped-types';
import { CreateBmiAssessmentDto } from './create-bmi-assessment.dto';

export class UpdateBmiAssessmentDto extends PartialType(CreateBmiAssessmentDto) {}
