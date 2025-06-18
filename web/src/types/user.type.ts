import { FieldValues } from 'react-hook-form';

export const userRoleOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'teacher', label: 'Professor' },
];

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export const UserRoleLabel: FieldValues = {
  [UserRole.ADMIN]: { label: 'Administrador', color: 'brand' },
  [UserRole.TEACHER]: { label: 'Professor', color: 'secondary' },
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
