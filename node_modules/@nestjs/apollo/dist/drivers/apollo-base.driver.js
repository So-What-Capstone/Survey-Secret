"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloBaseDriver = void 0;
const common_1 = require("@nestjs/common");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const graphql_1 = require("@nestjs/graphql");
const apollo_server_core_1 = require("apollo-server-core");
const omit = require("lodash.omit");
const async_iterator_util_1 = require("../utils/async-iterator.util");
const apolloPredefinedExceptions = {
    [common_1.HttpStatus.BAD_REQUEST]: apollo_server_core_1.UserInputError,
    [common_1.HttpStatus.UNAUTHORIZED]: apollo_server_core_1.AuthenticationError,
    [common_1.HttpStatus.FORBIDDEN]: apollo_server_core_1.ForbiddenError,
};
class ApolloBaseDriver extends graphql_1.AbstractGraphQLDriver {
    get instance() {
        return this._apolloServer;
    }
    async start(apolloOptions) {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const platformName = httpAdapter.getType();
        if (platformName === 'express') {
            await this.registerExpress(apolloOptions);
        }
        else if (platformName === 'fastify') {
            await this.registerFastify(apolloOptions);
        }
        else {
            throw new Error(`No support for current HttpAdapter: ${platformName}`);
        }
    }
    stop() {
        var _a;
        return (_a = this._apolloServer) === null || _a === void 0 ? void 0 : _a.stop();
    }
    async mergeDefaultOptions(options) {
        let defaults = {
            path: '/graphql',
            fieldResolverEnhancers: [],
            stopOnTerminationSignals: false,
        };
        if ((options.playground === undefined &&
            process.env.NODE_ENV !== 'production') ||
            options.playground) {
            const playgroundOptions = typeof options.playground === 'object' ? options.playground : undefined;
            defaults = {
                ...defaults,
                plugins: [
                    (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(playgroundOptions),
                ],
            };
        }
        else if ((options.playground === undefined &&
            process.env.NODE_ENV === 'production') ||
            options.playground === false) {
            defaults = {
                ...defaults,
                plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageDisabled)()],
            };
        }
        options = await super.mergeDefaultOptions(options, omit(defaults, 'plugins'));
        options.plugins = (options.plugins || []).concat(defaults.plugins || []);
        this.wrapContextResolver(options);
        this.wrapFormatErrorFn(options);
        return options;
    }
    subscriptionWithFilter(instanceRef, filterFn, createSubscribeContext) {
        return (...args) => (0, async_iterator_util_1.createAsyncIterator)(createSubscribeContext()(...args), (payload) => filterFn.call(instanceRef, payload, ...args.slice(1)));
    }
    async registerExpress(apolloOptions, { preStartHook } = {}) {
        const { ApolloServer } = (0, load_package_util_1.loadPackage)('apollo-server-express', 'GraphQLModule', () => require('apollo-server-express'));
        const { disableHealthCheck, path, onHealthCheck, cors, bodyParserConfig } = apolloOptions;
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const app = httpAdapter.getInstance();
        preStartHook === null || preStartHook === void 0 ? void 0 : preStartHook();
        const apolloServer = new ApolloServer(apolloOptions);
        await apolloServer.start();
        apolloServer.applyMiddleware({
            app,
            path,
            disableHealthCheck,
            onHealthCheck,
            cors,
            bodyParserConfig,
        });
        this._apolloServer = apolloServer;
    }
    async registerFastify(apolloOptions, { preStartHook } = {}) {
        const { ApolloServer } = (0, load_package_util_1.loadPackage)('apollo-server-fastify', 'GraphQLModule', () => require('apollo-server-fastify'));
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const app = httpAdapter.getInstance();
        preStartHook === null || preStartHook === void 0 ? void 0 : preStartHook();
        const apolloServer = new ApolloServer(apolloOptions);
        await apolloServer.start();
        const { disableHealthCheck, onHealthCheck, cors, bodyParserConfig, path } = apolloOptions;
        await app.register(apolloServer.createHandler({
            disableHealthCheck,
            onHealthCheck,
            cors,
            bodyParserConfig,
            path,
        }));
        this._apolloServer = apolloServer;
    }
    wrapFormatErrorFn(options) {
        if (options.autoTransformHttpErrors === false) {
            return;
        }
        if (options.formatError) {
            const origFormatError = options.formatError;
            const transformHttpErrorFn = this.createTransformHttpErrorFn();
            options.formatError = (err) => {
                err = transformHttpErrorFn(err);
                return origFormatError(err);
            };
        }
        else {
            options.formatError =
                this.createTransformHttpErrorFn();
        }
    }
    createTransformHttpErrorFn() {
        return (originalError) => {
            var _a, _b;
            const exceptionRef = (_a = originalError === null || originalError === void 0 ? void 0 : originalError.extensions) === null || _a === void 0 ? void 0 : _a.exception;
            const isHttpException = ((_b = exceptionRef === null || exceptionRef === void 0 ? void 0 : exceptionRef.response) === null || _b === void 0 ? void 0 : _b.statusCode) && (exceptionRef === null || exceptionRef === void 0 ? void 0 : exceptionRef.status);
            if (!isHttpException) {
                return originalError;
            }
            let error;
            const httpStatus = exceptionRef === null || exceptionRef === void 0 ? void 0 : exceptionRef.status;
            if (httpStatus in apolloPredefinedExceptions) {
                error = new apolloPredefinedExceptions[httpStatus](exceptionRef === null || exceptionRef === void 0 ? void 0 : exceptionRef.message);
            }
            else {
                error = new apollo_server_core_1.ApolloError(exceptionRef.message, httpStatus === null || httpStatus === void 0 ? void 0 : httpStatus.toString());
            }
            error.stack = exceptionRef === null || exceptionRef === void 0 ? void 0 : exceptionRef.stacktrace;
            error.extensions['response'] = exceptionRef === null || exceptionRef === void 0 ? void 0 : exceptionRef.response;
            return error;
        };
    }
    wrapContextResolver(targetOptions, originalOptions = { ...targetOptions }) {
        if (!targetOptions.context) {
            targetOptions.context = ({ req, request }) => ({ req: req !== null && req !== void 0 ? req : request });
        }
        else if ((0, shared_utils_1.isFunction)(targetOptions.context)) {
            targetOptions.context = async (...args) => {
                const ctx = await originalOptions.context(...args);
                const { req, request } = args[0];
                return this.assignReqProperty(ctx, req !== null && req !== void 0 ? req : request);
            };
        }
        else {
            targetOptions.context = ({ req, request }) => {
                return this.assignReqProperty(originalOptions.context, req !== null && req !== void 0 ? req : request);
            };
        }
    }
    assignReqProperty(ctx, req) {
        if (!ctx) {
            return { req };
        }
        if (typeof ctx !== 'object' ||
            (ctx && ctx.req && typeof ctx.req === 'object')) {
            return ctx;
        }
        ctx.req = req;
        return ctx;
    }
}
exports.ApolloBaseDriver = ApolloBaseDriver;
