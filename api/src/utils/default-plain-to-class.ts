import {
  ClassConstructor,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';

export function defaultPlainToClass<T, V>(
  cls: ClassConstructor<T>,
  plain: V | V[],
  options?: ClassTransformOptions,
): T | T[] {
  return plainToClass(cls, plain, {
    excludeExtraneousValues: true,
    ...options,
  });
}
