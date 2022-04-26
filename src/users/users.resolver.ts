import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dto';
import { UsersService } from './users.service';
import {
  FindUserByIdInput,
  FindUserByIdOutput,
} from './dtos/find-user-by-id.dto';
import { Type } from '../auth/type.decorator';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { EditUserInput, EditUserOutput } from './dtos/edit-user.dto';
import { User } from './schemas/user.schema';
import { AuthUser } from '../auth/auth-user.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => Boolean)
  test() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Query((returns) => FindUserByIdOutput)
  findUserById(
    @Args('input') { id }: FindUserByIdInput,
  ): Promise<FindUserByIdOutput> {
    return this.usersService.findUserById(id);
  }

  @Mutation((returns) => EditUserOutput)
  @Type(['Any'])
  editUser(
    @AuthUser() user: User,
    @Args('input') editUserInput: EditUserInput,
  ): Promise<EditUserOutput> {
    return this.usersService.editUser(user, editUserInput);
  }
}
