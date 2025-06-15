import { Test, TestingModule } from '@nestjs/testing';
import { BmiAssessmentService } from './bmi-assessment.service';

describe('BmiAssessmentService', () => {
  let service: BmiAssessmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BmiAssessmentService],
    }).compile();

    service = module.get<BmiAssessmentService>(BmiAssessmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
