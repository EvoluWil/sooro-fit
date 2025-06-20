import { UserRole } from 'src/enums/user-role.enum';
import { User } from 'src/modules/user/entities/user.entity';

class RoleValidator {
  isAdmin(user: User): boolean {
    return user.role === UserRole.ADMIN;
  }

  isTeacher(user: User): boolean {
    return user.role === UserRole.TEACHER || this.isAdmin(user);
  }

  isTeacherOnly(user: User): boolean {
    return user.role === UserRole.TEACHER;
  }

  isStudent(user: User): boolean {
    return (
      user.role === UserRole.STUDENT ||
      this.isTeacher(user) ||
      this.isAdmin(user)
    );
  }

  isStudentOnly(user: User): boolean {
    return user.role === UserRole.STUDENT;
  }
}

export const roleValidator = new RoleValidator();
