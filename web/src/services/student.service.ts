import { StudentForm } from '@/components/forms/student/schema-student-form';
import { api } from '@/config/api/api';
import { User } from '@/types/user.type';

class StudentService {
  async create(student: StudentForm) {
    const { data } = await api.post<{ ok: boolean; message: string }>(
      '/student',
      student,
    );
    return data;
  }

  async findAll() {
    const { data } = await api.get<User[]>('/student');
    return data;
  }

  async findOne(id: string) {
    const { data } = await api.get<User>(`/student/${id}`);
    return data;
  }

  async update(id: string, student: StudentForm) {
    const { data } = await api.put<{ ok: boolean; message: string }>(
      `/student/${id}`,
      student,
    );
    return data;
  }

  async delete(id: string) {
    const { data } = await api.delete<{ ok: boolean; message: string }>(
      `/student/${id}`,
    );
    return data;
  }
}

export const studentsService = new StudentService();
