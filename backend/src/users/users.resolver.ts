import { Args, Context, Mutation, Query } from '@nestjs/graphql';
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
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { meOutput } from './dtos/me.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
    // @Args('file', { type: () => GraphQLUpload }) avatarImg: FileUpload,
  ): Promise<EditUserOutput> {
    return this.usersService.editUser(user, editUserInput);
  }

  @Query((returns) => meOutput)
  @Type(['Any'])
  me(@AuthUser() user: User): Promise<meOutput> {
    return this.usersService.me(user);
  }
}
