import { AssessmentLevel } from 'src/enums/bmi-assessment.enum';

type BmiCalculated = {
  bmi: number;
  assessment: AssessmentLevel;
};

class BmiCalculator {
  private getBmiAssessment(bmi: number): AssessmentLevel {
    if (bmi < 18.5) {
      return AssessmentLevel.UNDERWEIGHT;
    }

    if (bmi >= 18.5 && bmi <= 24.9) {
      return AssessmentLevel.NORMAL;
    }

    if (bmi >= 25 && bmi <= 29.9) {
      return AssessmentLevel.OVERWEIGHT;
    }

    if (bmi >= 30 && bmi <= 34.9) {
      return AssessmentLevel.OBESITY_1;
    }

    if (bmi >= 35 && bmi <= 39.9) {
      return AssessmentLevel.OBESITY_2;
    }

    return AssessmentLevel.OBESITY_3;
  }

  calculate(height: number, weight: number): BmiCalculated {
    if (height <= 0 || weight <= 0) {
      throw new Error('Height and weight must be positive numbers');
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    return {
      bmi: parseFloat(bmi.toFixed(2)),
      assessment: this.getBmiAssessment(bmi),
    };
  }
}

export const bmiCalculator = new BmiCalculator();
