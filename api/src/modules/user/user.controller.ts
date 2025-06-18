import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IsAdmin } from 'src/decorators/system-admin.decorator';
import { YupValidationPipe } from 'src/pipes/yup.pipe';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { UserService } from './user.service';

@IsAdmin()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body(new YupValidationPipe(createUserSchema)) createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new YupValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
