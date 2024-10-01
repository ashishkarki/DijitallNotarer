import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { OperationResult } from '../models/operation-result.dto';
import { OtpService } from '../otp/otp.service';
import * as bcrypt from 'bcrypt';

// Define the User type based on PrismaService
// @ts-ignore
type User = PrismaService['user']['create']['data'];

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private otpService: OtpService,
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<OperationResult> {
    const { name, email, password, dob, citizenship, passportNumber } =
      registerUserDto;

    // Check if the email is already used, since it's supposed to be unique
    try {
      const existingUser: User | null = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return new OperationResult(false, 'Error: email already in use!!');
      }

      // else register this new user & hash the pw before storing into DB
      const saltRounds = 10; // for bcrypt
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // TODO: Create a new user in the database without any validation or password hashing for now
      const user: User = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          name,
          email,
          password: hashedPassword, // TODO: raw password for now
          citizenship,
          passportNumber,
          dob: new Date(dob),
        },
      });

      // After user creation, generate OTP and send it via email
      const otpResult = await this.otpService.generateOtp(email);
      if (!otpResult.status) {
        return new OperationResult(
          true,
          `New User created with email ${email}, but failed to generate OTP: ${otpResult.message}`,
        );
      }

      const sendOtpResult = await this.otpService.sendOtpEmail(
        email,
        otpResult.otp!,
      );
      if (!sendOtpResult.status) {
        return new OperationResult(
          true,
          `New User created with email ${email}, but failed to send OTP: ${otpResult.message}`,
        );
      }

      return new OperationResult(
        true,
        `New User successfully created and OTP sent: ${JSON.stringify(user)}`,
      );
    } catch (error: any) {
      console.error(`Error in UserService.registerUser: ${error}`);
      return new OperationResult(
        false,
        `Failed to register user: ${error.message}`,
      );
    }
  }

  // Method to verify OTP provided by the user
  async verifyUserOtp(email: string, otp: string): Promise<OperationResult> {
    // delegate this to OtpService
    return this.otpService.verifyOtp(email, otp);
  }
}
