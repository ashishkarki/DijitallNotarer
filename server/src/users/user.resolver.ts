import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { OperationResult } from '../models/operation-result.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => OperationResult)
  async register(
    @Args('registerUserDto') registerUserDto: RegisterUserDto,
  ): Promise<OperationResult> {
    return this.userService.registerUser(registerUserDto);
  }
}
