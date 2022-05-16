import { GraphQLSchema } from 'graphql';
import { ServerOptions } from 'graphql-ws';
import { ServerOptions as SubscriptionTransportWsServerOptions } from 'subscriptions-transport-ws';
export declare type GraphQLWsSubscriptionsConfig = Partial<Pick<ServerOptions, 'connectionInitWaitTimeout' | 'onConnect' | 'onDisconnect' | 'onClose' | 'onSubscribe' | 'onNext'>> & {
    path?: string;
};
export declare type GraphQLSubscriptionTransportWsConfig = Partial<Pick<SubscriptionTransportWsServerOptions, 'onConnect' | 'onDisconnect' | 'keepAlive'>> & {
    path?: string;
};
export declare type SubscriptionConfig = {
    'graphql-ws'?: GraphQLWsSubscriptionsConfig | boolean;
    'subscriptions-transport-ws'?: GraphQLSubscriptionTransportWsConfig | boolean;
};
export interface GqlSubscriptionServiceOptions extends SubscriptionConfig {
    schema: GraphQLSchema;
    path?: string;
    context?: ServerOptions['context'];
}
export declare class GqlSubscriptionService {
    private readonly options;
    private readonly httpServer;
    private readonly wss;
    private readonly subTransWs;
    constructor(options: GqlSubscriptionServiceOptions, httpServer: any);
    private initialize;
    stop(): Promise<void>;
}
//# sourceMappingURL=gql-subscription.service.d.ts.map