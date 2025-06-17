import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'src/@types/user.type';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { IsAdmin } from 'src/decorators/system-admin.decorator';
import { IsTeacher } from 'src/decorators/teacher.decorator';
import { YupValidationPipe } from 'src/pipes/yup.pipe';
import { BmiAssessmentService } from './bmi-assessment.service';
import {
  CreateBmiAssessmentDto,
  createBmiAssessmentSchema,
} from './dto/create-bmi-assessment.dto';
import {
  UpdateBmiAssessmentDto,
  updateBmiAssessmentSchema,
} from './dto/update-bmi-assessment.dto';

@Controller('bmi-assessment')
export class BmiAssessmentController {
  constructor(private readonly bmiAssessmentService: BmiAssessmentService) {}

  @IsTeacher()
  @Post()
  create(
    @Body(new YupValidationPipe(createBmiAssessmentSchema))
    createBmiAssessmentDto: CreateBmiAssessmentDto,
  ) {
    return this.bmiAssessmentService.create(createBmiAssessmentDto);
  }

  @Get()
  findAll(@AuthUser() user: User) {
    return this.bmiAssessmentService.findAll(user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new YupValidationPipe(updateBmiAssessmentSchema))
    updateBmiAssessmentDto: UpdateBmiAssessmentDto,
    @AuthUser() user: User,
  ) {
    return this.bmiAssessmentService.update(
      id,
      updateBmiAssessmentDto,
      user.id,
    );
  }

  @IsAdmin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bmiAssessmentService.remove(id);
  }
}
