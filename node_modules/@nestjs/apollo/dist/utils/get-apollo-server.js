"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApolloServer = void 0;
const graphql_1 = require("@nestjs/graphql");
/**
 * Returns the underlying ApolloServer instance for a given application.
 * @param app Nest application reference
 * @returns Apollo Server instance used by the host application
 */
function getApolloServer(app) {
    var _a;
    try {
        const graphqlModule = app.get(graphql_1.GraphQLModule);
        return (_a = graphqlModule.graphQlAdapter) === null || _a === void 0 ? void 0 : _a.instance;
    }
    catch (error) { }
    throw new Error(`Nest could not find the "GraphQLModule" in your application's container. Please, double-check if it's registered in the given application.`);
}
exports.getApolloServer = getApolloServer;
