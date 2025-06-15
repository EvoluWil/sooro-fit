import { Test, TestingModule } from '@nestjs/testing';
import { BmiAssessmentController } from './bmi-assessment.controller';
import { BmiAssessmentService } from './bmi-assessment.service';

describe('BmiAssessmentController', () => {
  let controller: BmiAssessmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BmiAssessmentController],
      providers: [BmiAssessmentService],
    }).compile();

    controller = module.get<BmiAssessmentController>(BmiAssessmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
