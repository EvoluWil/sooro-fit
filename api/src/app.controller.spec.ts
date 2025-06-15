import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('healthCheck', () => {
    it('should return the health check object with name, status, and version', () => {
      const result = appController.healthCheck();
      expect(result).toHaveProperty('name', 'Sooro Fit Api');
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('version');
    });
  });
});
