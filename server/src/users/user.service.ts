import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { OperationResult } from '../models/operation-result.dto';

// Define the User type based on PrismaService
// @ts-ignore
type User = PrismaService['user']['create']['data'];

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<OperationResult> {
    const { name, email, password, dob, citizenship, passportNumber } =
      registerUserDto;

    // Check if the email is already used, since it's supposed to be unique
    const existingUser: User | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new OperationResult(false, 'Error: email already in use!!');
    }

    // TODO: Create a new user in the database without any validation or password hashing for now
    const user: User = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        name,
        email,
        password, // TODO: raw password for now
        citizenship,
        passportNumber,
        dob: new Date(dob),
      },
    });

    return new OperationResult(
      true,
      `New User successfully created: ${JSON.stringify(user)}`,
    );
  }
}
