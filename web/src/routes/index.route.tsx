import { User } from '@/types/user.type';
import { roleValidator } from '@/utils/role-validator';
import { FiHome, FiUsers } from 'react-icons/fi';
import { PiStudent } from 'react-icons/pi';

type Route = {
  path: string;
  rule: (user: User) => boolean;
  icon: React.ReactNode;
  label: string;
};

export const routes: Route[] = [
  {
    path: '/dashboard',
    rule: roleValidator.isTeacher,
    icon: <FiHome />,
    label: 'Início',
  },
  {
    path: '/students',
    rule: roleValidator.isAdmin,
    icon: <PiStudent />,
    label: 'Alunos',
  },
  {
    path: '/users',
    rule: roleValidator.isAdmin,
    icon: <FiUsers />,
    label: 'Usuários',
  },
];
