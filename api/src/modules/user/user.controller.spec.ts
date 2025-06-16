import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn().mockResolvedValue({ ok: true }),
    findAll: jest.fn().mockResolvedValue(['user1', 'user2']),
    findOne: jest.fn().mockResolvedValue('user1'),
    update: jest.fn().mockResolvedValue({ ok: true }),
    remove: jest.fn().mockResolvedValue({ ok: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on UserService', async () => {
    await expect(controller.create({} as any)).resolves.toEqual({ ok: true });
    expect(service.create).toHaveBeenCalled();
  });

  it('should call findAll on UserService', async () => {
    await expect(controller.findAll()).resolves.toEqual(['user1', 'user2']);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call findOne on UserService', async () => {
    await expect(controller.findOne('1')).resolves.toBe('user1');
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should call update on UserService', async () => {
    await expect(controller.update('1', {} as any)).resolves.toEqual({
      ok: true,
    });
    expect(service.update).toHaveBeenCalledWith('1', {});
  });

  it('should call remove on UserService', async () => {
    await expect(controller.remove('1')).resolves.toEqual({ ok: true });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
