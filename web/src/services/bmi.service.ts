import { api } from '@/config/api/api';
import { BmiAssessment } from '@/types/bmi-assessment.type';

class BmiService {
  async create(bmi: object) {
    const { data } = await api.post<{ ok: boolean; message: string }>(
      '/bmi-assessment',
      bmi,
    );
    return data;
  }

  async findAll() {
    const { data } = await api.get<BmiAssessment[]>(`/bmi-assessment`);
    return data;
  }

  async update(id: string, bmi: object) {
    const { data } = await api.put<{ ok: boolean; message: string }>(
      `/bmi-assessment/${id}`,
      bmi,
    );
    return data;
  }

  async delete(id: string) {
    const { data } = await api.delete<{ ok: boolean; message: string }>(
      `/bmi-assessment/${id}`,
    );
    return data;
  }
}

export const bmiService = new BmiService();
