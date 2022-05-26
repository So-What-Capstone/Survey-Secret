import { ModulesContainer } from '@nestjs/core';
import { ApolloDriverConfig } from '../interfaces';
import { ApolloBaseDriver } from './apollo-base.driver';
export declare class ApolloDriver extends ApolloBaseDriver {
    private _subscriptionService?;
    private readonly pluginsExplorerService;
    constructor(modulesContainer: ModulesContainer);
    start(apolloOptions: ApolloDriverConfig): Promise<void>;
    registerServer(apolloOptions: ApolloDriverConfig): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=apollo.driver.d.ts.map