enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export const UserRoleLabel = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.TEACHER]: 'Professor',
  [UserRole.STUDENT]: 'Aluno',
};

enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const UserStatusLabel = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.INACTIVE]: 'Inativo',
};

export type User = {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

export type UserWithTokens = User & {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
