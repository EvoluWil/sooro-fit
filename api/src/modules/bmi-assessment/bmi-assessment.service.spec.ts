import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { BmiAssessmentService } from './bmi-assessment.service';
import { BmiAssessment } from './entities/bmi-assessment.entity';

// Mocks necessários
jest.mock('src/utils/bmi-calculator', () => ({
  bmiCalculator: {
    calculate: jest.fn(() => ({ bmi: 22, assessment: 'NORMAL' })),
  },
}));

jest.mock('src/utils/role-validator', () => ({
  roleValidator: {
    isStudent: jest.fn(() => false),
    isAdmin: jest.fn(() => false),
    isTeacher: jest.fn(() => false),
    isStudentOnly: jest.fn(() => false),
    isTeacherOnly: jest.fn(() => false),
  },
}));

import { bmiCalculator } from 'src/utils/bmi-calculator';
import { roleValidator } from 'src/utils/role-validator';

describe('BmiAssessmentService', () => {
  let service: BmiAssessmentService;
  let userRepository: any;
  let bmiAssessmentRepository: any;

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]),
  };

  const mockBmiAssessmentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BmiAssessmentService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        {
          provide: getRepositoryToken(BmiAssessment),
          useValue: mockBmiAssessmentRepository,
        },
      ],
    }).compile();

    service = module.get<BmiAssessmentService>(BmiAssessmentService);
    userRepository = module.get(getRepositoryToken(User));
    bmiAssessmentRepository = module.get(getRepositoryToken(BmiAssessment));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw if student not found', async () => {
      userRepository.findOne.mockResolvedValueOnce(null);
      await expect(
        service.create({ studentId: '1' } as any, '2'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw if student is inactive', async () => {
      userRepository.findOne.mockResolvedValueOnce({ status: 'inactive' });
      await expect(
        service.create({ studentId: '1' } as any, '2'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw if evaluator not found', async () => {
      userRepository.findOne
        .mockResolvedValueOnce({ status: 'active' })
        .mockResolvedValueOnce(null);

      await expect(
        service.create({ studentId: '1', evaluatorId: '2' } as any, '2'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create assessment if all valid', async () => {
      userRepository.findOne
        .mockResolvedValueOnce({ status: 'active', id: '1' })
        .mockResolvedValueOnce({ id: '2' });

      (bmiCalculator.calculate as jest.Mock).mockReturnValue({
        bmi: 22,
        assessment: 'NORMAL',
      });

      bmiAssessmentRepository.create.mockReturnValue({});
      bmiAssessmentRepository.save.mockResolvedValue({});

      const result = await service.create(
        {
          studentId: '1',
          evaluatorId: '2',
          height: 1.7,
          weight: 60,
        } as any,
        '2',
      );

      expect(result).toHaveProperty('ok', true);
    });
  });

  describe('findAll', () => {
    it('should throw if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.findAll('1')).rejects.toThrow(NotFoundException);
    });

    it('should return assessments for student', async () => {
      userRepository.findOne.mockResolvedValue({ id: '1', role: 'student' });
      (roleValidator.isStudentOnly as jest.Mock).mockReturnValue(true);
      mockQueryBuilder.getMany.mockResolvedValueOnce([1, 2]);
      const result = await service.findAll('1');
      expect(result).toEqual([1, 2]);
    });

    it('should return all for admin', async () => {
      userRepository.findOne.mockResolvedValue({ id: '1', role: 'admin' });
      (roleValidator.isStudentOnly as jest.Mock).mockReturnValue(false);
      (roleValidator.isTeacherOnly as jest.Mock).mockReturnValue(false);
      (roleValidator.isAdmin as jest.Mock).mockReturnValue(true);
      mockQueryBuilder.getMany.mockResolvedValueOnce([1, 2, 3]);
      const result = await service.findAll('1');
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return teacher assessments', async () => {
      userRepository.findOne.mockResolvedValue({ id: '1', role: 'teacher' });
      (roleValidator.isStudentOnly as jest.Mock).mockReturnValue(false);
      (roleValidator.isTeacherOnly as jest.Mock).mockReturnValue(true);
      (roleValidator.isAdmin as jest.Mock).mockReturnValue(false);
      mockQueryBuilder.getMany.mockResolvedValueOnce([4, 5]);
      const result = await service.findAll('1');
      expect(result).toEqual([4, 5]);
    });
  });

  describe('update', () => {
    const validUpdateDto = { height: 1.7, weight: 60, bmi: 22 };

    it('should throw if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.update('1', validUpdateDto, '2')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if assessment not found', async () => {
      userRepository.findOne.mockResolvedValue({ id: '2' });
      bmiAssessmentRepository.findOne.mockResolvedValue(null);
      await expect(service.update('1', validUpdateDto, '2')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update assessment if found', async () => {
      userRepository.findOne.mockResolvedValue({ id: '2' });
      bmiAssessmentRepository.findOne.mockResolvedValue({ id: '1' });
      bmiAssessmentRepository.update.mockResolvedValue({});
      const result = await service.update('1', validUpdateDto, '2');
      expect(result).toHaveProperty('ok', true);
    });
  });

  describe('remove', () => {
    it('should throw if assessment not found', async () => {
      bmiAssessmentRepository.findOne.mockResolvedValue(null);
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });

    it('should remove assessment if found', async () => {
      bmiAssessmentRepository.findOne.mockResolvedValue({ id: '1' });
      bmiAssessmentRepository.remove.mockResolvedValue({});
      const result = await service.remove('1');
      expect(result).toHaveProperty('ok', true);
    });
  });
});
