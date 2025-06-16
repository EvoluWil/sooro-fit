import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'src/enums/user-role.enum';
import { UserStatus } from 'src/enums/user-status.enum';

export class FindUserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  role: UserRole;

  @Exclude()
  password: string;

  @Expose()
  status: UserStatus;

  @Expose()
  createdAt: Date;
}
