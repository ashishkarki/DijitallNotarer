import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, you have reached the API for "DijitallNotarer" - the Digital Notarization Platform!!';
  }
}
