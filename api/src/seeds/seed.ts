import * as bcrypt from 'bcrypt';
import { dataSource } from 'src/providers/database/data-source';
import { AssessmentLevel } from '../enums/bmi-assessment.enum';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { BmiAssessment } from '../modules/bmi-assessment/entities/bmi-assessment.entity';
import { User } from '../modules/user/entities/user.entity';

async function seed() {
  await dataSource.initialize();

  await dataSource.getRepository(BmiAssessment).clear();
  await dataSource.getRepository(User).clear();

  const password = await bcrypt.hash('123456', 10);
  const admin = dataSource.getRepository(User).create({
    name: 'Admin',
    username: 'admin',
    password,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  });
  const teacher = dataSource.getRepository(User).create({
    name: 'Teacher',
    username: 'teacher',
    password,
    role: UserRole.TEACHER,
    status: UserStatus.ACTIVE,
  });
  const student = dataSource.getRepository(User).create({
    name: 'Student',
    username: 'student',
    password,
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
  });
  await dataSource.getRepository(User).save([admin, teacher, student]);

  const bmiAssessment = dataSource.getRepository(BmiAssessment).create({
    height: 1.75,
    weight: 70,
    bmi: 22.86,
    assessment: AssessmentLevel.NORMAL,
    student,
    evaluator: teacher,
  });
  await dataSource.getRepository(BmiAssessment).save(bmiAssessment);

  await dataSource.destroy();
  console.log('Seed complete!');
}

seed();
