import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [OtpModule],
  controllers: [],
  providers: [UserService, UserResolver, PrismaService],
})
export class UsersModule {}
