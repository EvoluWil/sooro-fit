import { FieldValues } from 'react-hook-form';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export const UserRoleLabel: FieldValues = {
  [UserRole.ADMIN]: { label: 'Administrador', color: 'brand' },
  [UserRole.TEACHER]: { label: 'Professor', color: 'secondary' },
};

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const UserStatusLabel = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.INACTIVE]: 'Inativo',
};

export const userRoleOptions = [
  { value: UserRole.ADMIN, label: 'Administrador' },
  { value: UserRole.TEACHER, label: 'Professor' },
];

export const userStatusOptions = [
  { value: UserStatus.ACTIVE, label: 'Ativo' },
  { value: UserStatus.INACTIVE, label: 'Inativo' },
];

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
