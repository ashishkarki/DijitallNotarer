import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

@InputType()
export class RegisterUserDto {
  @Field() // Expose this field to GraphQL
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  citizenship: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  passportNumber: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8) // Password must be at least 8 characters
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  }) // At least one uppercase letter
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  }) // At least one number
  @Matches(/(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one special character',
  }) // At least one special character
  password: string;
}
