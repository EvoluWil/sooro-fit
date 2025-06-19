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
import { IsAdmin } from 'src/decorators/system-admin.decorator';
import { IsTeacher } from 'src/decorators/teacher.decorator';
import { YupValidationPipe } from 'src/pipes/yup.pipe';
import {
  CreateStudentDto,
  createStudentSchema,
} from './dto/create-student.dto';
import {
  UpdateStudentDto,
  updateStudentSchema,
} from './dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @IsTeacher()
  @Post()
  create(
    @Body(new YupValidationPipe(createStudentSchema))
    createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.create(createStudentDto);
  }

  @IsTeacher()
  @Get()
  findAll(@Query('active') active?: boolean) {
    return this.studentService.findAll(active);
  }

  @IsTeacher()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @IsTeacher()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new YupValidationPipe(updateStudentSchema))
    updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @IsAdmin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
