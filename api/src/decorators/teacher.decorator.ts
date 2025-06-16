import { SetMetadata } from '@nestjs/common';

export const IS_TEACHER_KEY = 'BE667900D79DC46745798417FSA23B8FB816E03F63';
export const IsTeacher = () => SetMetadata(IS_TEACHER_KEY, true);
