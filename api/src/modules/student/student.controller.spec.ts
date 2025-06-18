import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  const mockStudentService = {
    create: jest.fn().mockResolvedValue({ ok: true }),
    findAll: jest.fn().mockResolvedValue(['student1', 'student2']),
    findOne: jest.fn().mockResolvedValue('student1'),
    update: jest.fn().mockResolvedValue({ ok: true }),
    remove: jest.fn().mockResolvedValue({ ok: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [{ provide: StudentService, useValue: mockStudentService }],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on StudentService', async () => {
    await expect(controller.create({} as any)).resolves.toEqual({ ok: true });
    expect(service.create).toHaveBeenCalled();
  });

  it('should call findAll on StudentService', async () => {
    await expect(controller.findAll()).resolves.toEqual([
      'student1',
      'student2',
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call findOne on StudentService', async () => {
    await expect(controller.findOne('1')).resolves.toBe('student1');
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should call update on StudentService', async () => {
    await expect(controller.update('1', {} as any)).resolves.toEqual({
      ok: true,
    });
    expect(service.update).toHaveBeenCalledWith('1', {});
  });

  it('should call remove on StudentService', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ ok: true });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
