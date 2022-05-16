import { ModulesContainer } from '@nestjs/core';
import { GraphQLFederationFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '../interfaces';
import { ApolloBaseDriver } from './apollo-base.driver';
export declare class ApolloFederationDriver extends ApolloBaseDriver {
    private readonly graphqlFederationFactory;
    private readonly pluginsExplorerService;
    constructor(graphqlFederationFactory: GraphQLFederationFactory, modulesContainer: ModulesContainer);
    start(options: ApolloDriverConfig): Promise<void>;
    private runExecutorFactoryIfPresent;
}
//# sourceMappingURL=apollo-federation.driver.d.ts.map