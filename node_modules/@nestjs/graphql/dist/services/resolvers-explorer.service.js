"use strict";
var ResolversExplorerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolversExplorerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const core_1 = require("@nestjs/core");
const external_context_creator_1 = require("@nestjs/core/helpers/external-context-creator");
const injector_1 = require("@nestjs/core/injector/injector");
const internal_core_module_1 = require("@nestjs/core/injector/internal-core-module");
const request_constants_1 = require("@nestjs/core/router/request/request-constants");
const lodash_1 = require("lodash");
const abstract_graphql_driver_1 = require("../drivers/abstract-graphql.driver");
const gql_paramtype_enum_1 = require("../enums/gql-paramtype.enum");
const resolver_enum_1 = require("../enums/resolver.enum");
const params_factory_1 = require("../factories/params.factory");
const graphql_constants_1 = require("../graphql.constants");
const decorate_field_resolver_util_1 = require("../utils/decorate-field-resolver.util");
const extract_metadata_util_1 = require("../utils/extract-metadata.util");
const base_explorer_service_1 = require("./base-explorer.service");
let ResolversExplorerService = ResolversExplorerService_1 = class ResolversExplorerService extends base_explorer_service_1.BaseExplorerService {
    constructor(modulesContainer, metadataScanner, externalContextCreator, gqlOptions, moduleRef) {
        super();
        this.modulesContainer = modulesContainer;
        this.metadataScanner = metadataScanner;
        this.externalContextCreator = externalContextCreator;
        this.gqlOptions = gqlOptions;
        this.moduleRef = moduleRef;
        this.logger = new common_1.Logger(ResolversExplorerService_1.name);
        this.gqlParamsFactory = new params_factory_1.GqlParamsFactory();
        this.injector = new injector_1.Injector();
    }
    explore() {
        const modules = this.getModules(this.modulesContainer, this.gqlOptions.include || []);
        const gqlAdapter = this.moduleRef.get(abstract_graphql_driver_1.AbstractGraphQLDriver);
        const resolvers = this.flatMap(modules, (instance, moduleRef) => this.filterResolvers(gqlAdapter, instance, moduleRef));
        return this.groupMetadata(resolvers);
    }
    filterResolvers(gqlAdapter, wrapper, moduleRef) {
        const { instance } = wrapper;
        if (!instance) {
            return undefined;
        }
        const prototype = Object.getPrototypeOf(instance);
        const predicate = (resolverType, isReferenceResolver, isPropertyResolver) => (0, shared_utils_1.isUndefined)(resolverType) ||
            (!isReferenceResolver &&
                !isPropertyResolver &&
                ![resolver_enum_1.Resolver.MUTATION, resolver_enum_1.Resolver.QUERY, resolver_enum_1.Resolver.SUBSCRIPTION].some((type) => type === resolverType));
        const resolvers = this.metadataScanner.scanFromPrototype(instance, prototype, (name) => (0, extract_metadata_util_1.extractMetadata)(instance, prototype, name, predicate));
        const isRequestScoped = !wrapper.isDependencyTreeStatic();
        return resolvers
            .filter((resolver) => !!resolver)
            .map((resolver) => {
            const createContext = (transform) => this.createContextCallback(instance, prototype, wrapper, moduleRef, resolver, isRequestScoped, transform);
            if (resolver.type === graphql_constants_1.SUBSCRIPTION_TYPE) {
                if (!wrapper.isDependencyTreeStatic()) {
                    // Note: We don't throw an exception here for backward
                    // compatibility reasons.
                    this.logger.error(`"${wrapper.metatype.name}" resolver is request or transient-scoped. Resolvers that register subscriptions with the "@Subscription()" decorator must be static (singleton).`);
                }
                const subscriptionOptions = Reflect.getMetadata(graphql_constants_1.SUBSCRIPTION_OPTIONS_METADATA, instance[resolver.methodName]);
                return this.createSubscriptionMetadata(gqlAdapter, createContext, subscriptionOptions, resolver, instance);
            }
            return {
                ...resolver,
                callback: createContext(),
            };
        });
    }
    createContextCallback(instance, prototype, wrapper, moduleRef, resolver, isRequestScoped, transform = lodash_1.identity) {
        const paramsFactory = this.gqlParamsFactory;
        const isPropertyResolver = ![
            resolver_enum_1.Resolver.MUTATION,
            resolver_enum_1.Resolver.QUERY,
            resolver_enum_1.Resolver.SUBSCRIPTION,
        ].some((type) => type === resolver.type);
        const fieldResolverEnhancers = this.gqlOptions.fieldResolverEnhancers || [];
        const contextOptions = resolver.methodName === graphql_constants_1.FIELD_TYPENAME
            ? { guards: false, filters: false, interceptors: false }
            : isPropertyResolver
                ? {
                    guards: fieldResolverEnhancers.includes('guards'),
                    filters: fieldResolverEnhancers.includes('filters'),
                    interceptors: fieldResolverEnhancers.includes('interceptors'),
                }
                : undefined;
        if (isRequestScoped) {
            const resolverCallback = async (...args) => {
                const gqlContext = paramsFactory.exchangeKeyForValue(gql_paramtype_enum_1.GqlParamtype.CONTEXT, undefined, args);
                let contextId;
                if (gqlContext && gqlContext[request_constants_1.REQUEST_CONTEXT_ID]) {
                    contextId = gqlContext[request_constants_1.REQUEST_CONTEXT_ID];
                }
                else if (gqlContext &&
                    gqlContext.req &&
                    gqlContext.req[request_constants_1.REQUEST_CONTEXT_ID]) {
                    contextId = gqlContext.req[request_constants_1.REQUEST_CONTEXT_ID];
                }
                else {
                    contextId = (0, core_1.createContextId)();
                    Object.defineProperty(gqlContext, request_constants_1.REQUEST_CONTEXT_ID, {
                        value: contextId,
                        enumerable: false,
                        configurable: false,
                        writable: false,
                    });
                }
                this.registerContextProvider(gqlContext, contextId);
                const contextInstance = await this.injector.loadPerContext(instance, moduleRef, moduleRef.providers, contextId);
                const callback = this.externalContextCreator.create(contextInstance, transform(contextInstance[resolver.methodName]), resolver.methodName, graphql_constants_1.PARAM_ARGS_METADATA, paramsFactory, contextId, wrapper.id, contextOptions, 'graphql');
                return callback(...args);
            };
            return isPropertyResolver
                ? this.registerFieldMiddlewareIfExists(resolverCallback, instance, resolver.methodName)
                : resolverCallback;
        }
        const resolverCallback = this.externalContextCreator.create(instance, prototype[resolver.methodName], resolver.methodName, graphql_constants_1.PARAM_ARGS_METADATA, paramsFactory, undefined, undefined, contextOptions, 'graphql');
        return isPropertyResolver
            ? this.registerFieldMiddlewareIfExists(resolverCallback, instance, resolver.methodName)
            : resolverCallback;
    }
    createSubscriptionMetadata(gqlAdapter, createSubscribeContext, subscriptionOptions, resolverMetadata, instanceRef) {
        const resolveFunc = subscriptionOptions &&
            subscriptionOptions.resolve &&
            subscriptionOptions.resolve.bind(instanceRef);
        const baseCallbackMetadata = {
            resolve: resolveFunc,
        };
        if (subscriptionOptions && subscriptionOptions.filter) {
            return {
                ...resolverMetadata,
                callback: {
                    ...baseCallbackMetadata,
                    subscribe: gqlAdapter.subscriptionWithFilter(instanceRef, subscriptionOptions.filter, createSubscribeContext),
                },
            };
        }
        return {
            ...resolverMetadata,
            callback: {
                ...baseCallbackMetadata,
                subscribe: createSubscribeContext(),
            },
        };
    }
    getAllCtors() {
        const modules = this.getModules(this.modulesContainer, this.gqlOptions.include || []);
        const resolvers = this.flatMap(modules, this.mapToCtor).filter(Boolean);
        return resolvers;
    }
    mapToCtor(wrapper) {
        const { instance } = wrapper;
        if (!instance) {
            return undefined;
        }
        return instance.constructor;
    }
    registerContextProvider(request, contextId) {
        const coreModuleArray = [...this.modulesContainer.entries()]
            .filter(([key, { metatype }]) => metatype && metatype.name === internal_core_module_1.InternalCoreModule.name)
            .map(([key, value]) => value);
        const coreModuleRef = (0, lodash_1.head)(coreModuleArray);
        if (!coreModuleRef) {
            return;
        }
        const wrapper = coreModuleRef.getProviderByKey(core_1.REQUEST);
        wrapper.setInstanceByContextId(contextId, {
            instance: request,
            isResolved: true,
        });
    }
    registerFieldMiddlewareIfExists(resolverFn, instance, methodKey) {
        var _a, _b;
        const fieldMiddleware = Reflect.getMetadata(graphql_constants_1.FIELD_RESOLVER_MIDDLEWARE_METADATA, instance[methodKey]);
        const middlewareFunctions = (((_b = (_a = this.gqlOptions) === null || _a === void 0 ? void 0 : _a.buildSchemaOptions) === null || _b === void 0 ? void 0 : _b.fieldMiddleware) || []).concat(fieldMiddleware || []);
        if ((middlewareFunctions === null || middlewareFunctions === void 0 ? void 0 : middlewareFunctions.length) === 0) {
            return resolverFn;
        }
        const originalResolveFnFactory = (...args) => () => resolverFn(...args);
        return (0, decorate_field_resolver_util_1.decorateFieldResolverWithMiddleware)(originalResolveFnFactory, middlewareFunctions);
    }
};
ResolversExplorerService = ResolversExplorerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(3, (0, common_1.Inject)(graphql_constants_1.GRAPHQL_MODULE_OPTIONS)),
    tslib_1.__metadata("design:paramtypes", [core_1.ModulesContainer,
        core_1.MetadataScanner,
        external_context_creator_1.ExternalContextCreator, Object, core_1.ModuleRef])
], ResolversExplorerService);
exports.ResolversExplorerService = ResolversExplorerService;
