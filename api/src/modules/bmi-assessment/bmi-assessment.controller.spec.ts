import { Test, TestingModule } from '@nestjs/testing';
import { BmiAssessmentController } from './bmi-assessment.controller';
import { BmiAssessmentService } from './bmi-assessment.service';

describe('BmiAssessmentController', () => {
  let controller: BmiAssessmentController;
  let service: BmiAssessmentService;

  const mockBmiAssessmentService = {
    create: jest.fn().mockResolvedValue({ ok: true }),
    findAll: jest.fn().mockResolvedValue(['assessment1', 'assessment2']),
    update: jest.fn().mockResolvedValue({ ok: true }),
    remove: jest.fn().mockResolvedValue({ ok: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BmiAssessmentController],
      providers: [
        { provide: BmiAssessmentService, useValue: mockBmiAssessmentService },
      ],
    }).compile();

    controller = module.get<BmiAssessmentController>(BmiAssessmentController);
    service = module.get<BmiAssessmentService>(BmiAssessmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on BmiAssessmentService', async () => {
    await expect(controller.create({} as any)).resolves.toEqual({ ok: true });
    expect(service.create).toHaveBeenCalled();
  });

  it('should call findAll on BmiAssessmentService', async () => {
    await expect(controller.findAll({ id: '1' } as any)).resolves.toEqual([
      'assessment1',
      'assessment2',
    ]);
    expect(service.findAll).toHaveBeenCalledWith('1');
  });

  it('should call update on BmiAssessmentService', async () => {
    await expect(
      controller.update('1', {} as any, { id: '1' } as any),
    ).resolves.toEqual({ ok: true });
    expect(service.update).toHaveBeenCalledWith('1', {}, '1');
  });

  it('should call remove on BmiAssessmentService', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ ok: true });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
