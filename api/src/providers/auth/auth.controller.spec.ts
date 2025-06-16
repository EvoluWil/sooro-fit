import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signIn: jest.fn().mockResolvedValue('signed-in'),
    getMe: jest.fn().mockResolvedValue('me'),
    refreshToken: jest.fn().mockResolvedValue('refreshed'),
    signOut: jest.fn().mockResolvedValue('signed-out'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call signIn on AuthService', async () => {
    await expect(controller.signIn({} as any)).resolves.toBe('signed-in');
    expect(service.signIn).toHaveBeenCalled();
  });

  it('should call getMe on AuthService', async () => {
    await expect(controller.getMe({ id: '1' } as any)).resolves.toBe('me');
    expect(service.getMe).toHaveBeenCalledWith('1');
  });

  it('should call refreshToken on AuthService', async () => {
    await expect(
      controller.refreshToken({ refreshToken: 'token' } as any),
    ).resolves.toBe('refreshed');
    expect(service.refreshToken).toHaveBeenCalledWith('token');
  });

  it('should call signOut on AuthService', async () => {
    await expect(controller.signOut({ id: '1' } as any)).resolves.toBe(
      'signed-out',
    );
    expect(service.signOut).toHaveBeenCalledWith('1');
  });
});
