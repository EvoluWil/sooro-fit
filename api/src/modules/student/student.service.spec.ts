import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums/user-role.enum';
import { UserStatus } from 'src/enums/user-status.enum';
import { User } from '../user/entities/user.entity';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let userRepository: any;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    userRepository = module.get(getRepositoryToken(User));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw if username exists', async () => {
      userRepository.findOne.mockResolvedValue({});
      await expect(
        service.create({ username: 'test', password: 'pass' } as any),
      ).rejects.toThrow(ConflictException);
    });
    it('should create student if username does not exist', async () => {
      userRepository.findOne.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock) = jest.fn().mockResolvedValue('hashed');
      userRepository.create.mockReturnValue({});
      userRepository.save.mockResolvedValue({});
      const result = await service.create({
        username: 'test',
        password: 'pass',
      } as any);
      expect(result).toHaveProperty('ok', true);
    });
  });

  describe('findAll', () => {
    it('should return all students', async () => {
      userRepository.find.mockResolvedValue([
        { id: '1', role: UserRole.STUDENT },
      ]);
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should throw if student not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
    it('should return student if found', async () => {
      userRepository.findOne.mockResolvedValue({
        id: '1',
        role: UserRole.STUDENT,
      });
      const result = await service.findOne('1');
      expect(result).toHaveProperty('id', '1');
    });
  });

  describe('update', () => {
    it('should throw if student not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(
        service.update('1', { name: 'test', status: UserStatus.ACTIVE }),
      ).rejects.toThrow(NotFoundException);
    });
    it('should update student if found', async () => {
      userRepository.findOne.mockResolvedValue({
        id: '1',
        role: UserRole.STUDENT,
      });
      userRepository.update.mockResolvedValue({});
      const result = await service.update('1', {
        name: 'test',
        status: UserStatus.ACTIVE,
      });
      expect(result).toHaveProperty('ok', true);
    });
  });

  describe('remove', () => {
    it('should throw if student not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
    it('should throw if student has assessments', async () => {
      userRepository.findOne.mockResolvedValue({
        id: '1',
        role: UserRole.STUDENT,
        assessments: [{}],
      });
      await expect(service.remove('1')).rejects.toThrow(ConflictException);
    });
    it('should remove student if found and no assessments', async () => {
      userRepository.findOne.mockResolvedValue({
        id: '1',
        role: UserRole.STUDENT,
        assessments: [],
      });
      userRepository.delete.mockResolvedValue({});
      const result = await service.remove('1');
      expect(result).toHaveProperty('ok', true);
    });
  });
});
