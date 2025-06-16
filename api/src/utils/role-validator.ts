import { UserRole } from 'src/enums/user-role.enum';
import { User } from 'src/modules/user/entities/user.entity';

class RoleValidator {
  isAdmin(user: User): boolean {
    return user.role === UserRole.ADMIN;
  }

  isTeacher(user: User): boolean {
    return user.role === UserRole.TEACHER || this.isAdmin(user);
  }
}

export const roleValidator = new RoleValidator();
