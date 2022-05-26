"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.AuthUser = (0, common_1.createParamDecorator)((data, context) => {
    const gqlContext = graphql_1.GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    return user;
});
//# sourceMappingURL=auth-user.decorator.js.map