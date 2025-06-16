import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'src/enums/user-status.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  delete: jest.fn(),
});
const mockAuthRepository = () => ({
  insert: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
const mockJwtService = () => ({
  sign: jest.fn().mockReturnValue('access-token'),
});

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: any;
  let authRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
        { provide: getRepositoryToken(Auth), useFactory: mockAuthRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    authRepository = module.get(getRepositoryToken(Auth));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should throw if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(
        service.signIn({ username: 'test', password: 'pass' }),
      ).rejects.toThrow('Usuário ou senha incorretos');
    });

    it('should throw if user is inactive', async () => {
      userRepository.findOne.mockResolvedValue({ status: UserStatus.INACTIVE });
      await expect(
        service.signIn({ username: 'test', password: 'pass' }),
      ).rejects.toThrow('Usuário sem permissão para acessar o sistema');
    });

    it('should throw if password does not match', async () => {
      userRepository.findOne.mockResolvedValue({
        status: UserStatus.ACTIVE,
        password: 'hash',
      });
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(false);
      await expect(
        service.signIn({ username: 'test', password: 'pass' }),
      ).rejects.toThrow('Usuário ou senha incorretos');
    });

    it('should return tokens and user if credentials are valid', async () => {
      const user = {
        id: '1',
        user: 'test',
        status: UserStatus.ACTIVE,
        password: 'hash',
      };
      userRepository.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
      authRepository.insert.mockResolvedValue({});
      authRepository.findOne.mockResolvedValue(null);
      authRepository.update.mockResolvedValue({});
      jest
        .spyOn(service as any, 'createSession')
        .mockResolvedValue({ refreshToken: 'refresh' });
      const result = await service.signIn({
        username: 'test',
        password: 'pass',
      });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('user');
    });
  });

  describe('getMe', () => {
    it('should throw if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.getMe('1')).rejects.toThrow(
        'Usuário não encontrado',
      );
    });
    it('should return user if found', async () => {
      userRepository.findOne.mockResolvedValue({ id: '1', user: 'test' });
      const result = await service.getMe('1');
      expect(result).toHaveProperty('id', '1');
    });
  });

  describe('signOut', () => {
    it('should call delete on authRepository', async () => {
      authRepository.delete.mockResolvedValue({});
      const result = await service.signOut('1');
      expect(authRepository.delete).toHaveBeenCalledWith({ user: { id: '1' } });
      expect(result).toEqual({
        ok: true,
        message: 'Sessão encerrada com sucesso',
      });
    });
  });
});
