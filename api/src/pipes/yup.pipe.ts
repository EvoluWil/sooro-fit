import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema<any>) {}

  async transform(value: unknown) {
    try {
      return await this.schema.validate(value, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (err) {
      throw new BadRequestException(err.errors);
    }
  }
}
