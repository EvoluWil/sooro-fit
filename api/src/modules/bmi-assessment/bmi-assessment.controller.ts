import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BmiAssessmentService } from './bmi-assessment.service';
import { CreateBmiAssessmentDto } from './dto/create-bmi-assessment.dto';
import { UpdateBmiAssessmentDto } from './dto/update-bmi-assessment.dto';

@Controller('bmi-assessment')
export class BmiAssessmentController {
  constructor(private readonly bmiAssessmentService: BmiAssessmentService) {}

  @Post()
  create(@Body() createBmiAssessmentDto: CreateBmiAssessmentDto) {
    return this.bmiAssessmentService.create(createBmiAssessmentDto);
  }

  @Get()
  findAll() {
    return this.bmiAssessmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bmiAssessmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBmiAssessmentDto: UpdateBmiAssessmentDto) {
    return this.bmiAssessmentService.update(+id, updateBmiAssessmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bmiAssessmentService.remove(+id);
  }
}
