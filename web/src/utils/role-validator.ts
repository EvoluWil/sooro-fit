import { User, UserRole } from '@/types/user.type';

class RoleValidator {
  isAdmin(user: User): boolean {
    return user.role === UserRole.ADMIN;
  }

  isTeacher(user: User): boolean {
    return user.role === UserRole.TEACHER || this.isAdmin(user);
  }

  isStudent(user: User): boolean {
    return (
      user.role === UserRole.STUDENT ||
      this.isTeacher(user) ||
      this.isAdmin(user)
    );
  }
}

export const roleValidator = new RoleValidator();
