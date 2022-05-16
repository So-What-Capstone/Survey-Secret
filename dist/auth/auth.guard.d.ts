import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from './../users/users.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly usersService;
    constructor(reflector: Reflector, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
