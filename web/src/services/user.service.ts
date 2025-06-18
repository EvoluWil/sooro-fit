import { UserForm } from '@/components/forms/user/schema-user-form';
import { api } from '@/config/api/api';
import { User } from '@/types/user.type';

class UserService {
  async create(user: UserForm) {
    const { data } = await api.post<{ ok: boolean; message: string }>(
      '/user',
      user,
    );
    return data;
  }

  async findAll() {
    const { data } = await api.get<User[]>('/user');
    return data;
  }

  async findOne(id: string) {
    const { data } = await api.get<User>(`/user/${id}`);
    return data;
  }

  async update(id: string, user: UserForm) {
    const { data } = await api.put<{ ok: boolean; message: string }>(
      `/user/${id}`,
      user,
    );
    return data;
  }

  async delete(id: string) {
    const { data } = await api.delete<{ ok: boolean; message: string }>(
      `/user/${id}`,
    );
    return data;
  }
}

export const usersService = new UserService();
