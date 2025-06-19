import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

export type BmiQueryParams = {
  studentId?: string;
  teacherId?: string;
};

@Controller('bmi-assessment')
export class BmiAssessmentController {
  constructor(private readonly bmiAssessmentService: BmiAssessmentService) {}

  @IsTeacher()
  @Post()
  create(
    @Body(new YupValidationPipe(createBmiAssessmentSchema))
    createBmiAssessmentDto: CreateBmiAssessmentDto,
    @AuthUser() user: User,
  ) {
    return this.bmiAssessmentService.create(createBmiAssessmentDto, user.id);
  }

  @Get()
  findAll(@Query() query: BmiQueryParams, @AuthUser() user: User) {
    return this.bmiAssessmentService.findAll(user.id, query);
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
