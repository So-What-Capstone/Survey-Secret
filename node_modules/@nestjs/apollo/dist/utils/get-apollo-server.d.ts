import { INestApplicationContext } from '@nestjs/common';
import { ApolloServerBase } from 'apollo-server-core';
/**
 * Returns the underlying ApolloServer instance for a given application.
 * @param app Nest application reference
 * @returns Apollo Server instance used by the host application
 */
export declare function getApolloServer(app: INestApplicationContext): ApolloServerBase;
//# sourceMappingURL=get-apollo-server.d.ts.map