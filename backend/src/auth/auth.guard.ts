import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from './../users/users.service';
import { AllowedTypes } from './type.decorator';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const types = this.reflector.get<AllowedTypes>(
      'types',
      context.getHandler(),
    );

    //not set @Type() decorator : public resolver
    if (!types) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;

    if (token !== 'null' && token) {
      const decoded = jwt.verify(token.toString(), process.env.SECRET_KEY);

      if (typeof decoded === 'object' && decoded.hasOwnProperty('data')) {
        const { user } = await this.usersService.findUserById(decoded.data);

        if (!user) {
          return false;
        }

        gqlContext['user'] = user;

        if (types.includes('Any') || types.includes('NotLoggedIn')) {
          return true;
        }

        return types.includes(user.type);
      } else {
        return false;
      }
    } else {
      if (types.includes('NotLoggedIn')) {
        return true;
      } else {
        return false;
      }
    }
  }
}
