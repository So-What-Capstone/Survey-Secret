"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./../users/users.service");
const jwt = require("jsonwebtoken");
let AuthGuard = class AuthGuard {
    constructor(reflector, usersService) {
        this.reflector = reflector;
        this.usersService = usersService;
    }
    async canActivate(context) {
        const types = this.reflector.get('types', context.getHandler());
        if (!types) {
            return true;
        }
        const gqlContext = graphql_1.GqlExecutionContext.create(context).getContext();
        const token = gqlContext.token;
        if (token) {
            const id = jwt.verify(token, process.env.SECRET_KEY);
            if (typeof id === 'string') {
                const { user } = await this.usersService.findById(id);
                if (!user) {
                    return false;
                }
                gqlContext['user'] = user;
                if (types.includes('Any')) {
                    return true;
                }
                return types.includes(user.type);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        users_service_1.UsersService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map