import { BmiAssessmentList } from '@/components/template/bmi-assessment-list';
import { bmiService } from '@/services/bmi.service';
import { User } from '@/types/user.type';
import { roleValidator } from '@/utils/role-validator';
import { getUserSession } from '@/utils/session';
import { redirect } from 'next/navigation';

export default async function BmiAssessmentPage() {
  const user = (await getUserSession()) as User;

  if (!roleValidator.isStudent(user)) {
    return redirect('/');
  }

  const bmiAssessments = await bmiService.findAll();

  return <BmiAssessmentList bmiAssessments={bmiAssessments || []} />;
}
