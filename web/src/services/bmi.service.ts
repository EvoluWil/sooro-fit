import { BmiForm } from '@/components/forms/bmi/schema-bmi-form';
import { BmiFilterForm } from '@/components/organisms/bmi-assessments-filter/schema-bmi-filter';
import { api } from '@/config/api/api';
import { BmiAssessment } from '@/types/bmi-assessment.type';

class BmiService {
  async create(bmi: BmiForm) {
    const { data } = await api.post<{ ok: boolean; message: string }>(
      '/bmi-assessment',
      bmi,
    );
    return data;
  }

  async findAll(params: BmiFilterForm = {} as BmiFilterForm) {
    const { data } = await api.get<BmiAssessment[]>(`/bmi-assessment`, {
      params,
    });
    return data;
  }

  async update(id: string, bmi: Omit<BmiForm, 'studentId'>) {
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
