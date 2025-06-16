import { SetMetadata } from '@nestjs/common';

export const IS_STUDENT_KEY = 'BE667900D79DC46725FSC45678ASG23B8FB816E03F63';
export const IsStudent = () => SetMetadata(IS_STUDENT_KEY, true);
