import { ApplicationConfig, HttpAdapterHost } from '@nestjs/core';
import { GraphQLFactory } from '../graphql.factory';
import { GqlModuleOptions, GraphQLDriver } from '../interfaces';
export declare abstract class AbstractGraphQLDriver<TOptions extends Record<string, any> = GqlModuleOptions> implements GraphQLDriver<TOptions> {
    protected readonly httpAdapterHost: HttpAdapterHost;
    protected readonly applicationConfig: ApplicationConfig;
    protected readonly graphQlFactory: GraphQLFactory;
    abstract start(options: TOptions): Promise<unknown>;
    abstract stop(): Promise<void>;
    mergeDefaultOptions(options: TOptions, defaults?: Record<string, any>): Promise<TOptions>;
    subscriptionWithFilter(instanceRef: unknown, filterFn: (payload: any, variables: any, context: any) => boolean | Promise<boolean>, createSubscribeContext: Function): any;
    protected getNormalizedPath(options: TOptions): string;
}
//# sourceMappingURL=abstract-graphql.driver.d.ts.map