import { Injectable } from '@nestjs/common';
import * as packageJson from '../package.json';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      name: 'Sooro Fit Api',
      status: 'ok',
      version: packageJson.version,
    };
  }
}
