"use strict";
var GraphQLModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const messages_1 = require("@nestjs/core/helpers/messages");
const abstract_graphql_driver_1 = require("./drivers/abstract-graphql.driver");
const graphql_federation_factory_1 = require("./federation/graphql-federation.factory");
const graphql_ast_explorer_1 = require("./graphql-ast.explorer");
const graphql_schema_builder_1 = require("./graphql-schema.builder");
const graphql_schema_host_1 = require("./graphql-schema.host");
const graphql_types_loader_1 = require("./graphql-types.loader");
const graphql_constants_1 = require("./graphql.constants");
const graphql_factory_1 = require("./graphql.factory");
const schema_builder_module_1 = require("./schema-builder/schema-builder.module");
const services_1 = require("./services");
const utils_1 = require("./utils");
let GraphQLModule = GraphQLModule_1 = class GraphQLModule {
    constructor(httpAdapterHost, options, _graphQlAdapter, graphQlTypesLoader) {
        this.httpAdapterHost = httpAdapterHost;
        this.options = options;
        this._graphQlAdapter = _graphQlAdapter;
        this.graphQlTypesLoader = graphQlTypesLoader;
    }
    get graphQlAdapter() {
        return this._graphQlAdapter;
    }
    async onModuleDestroy() {
        await this._graphQlAdapter.stop();
    }
    static forRoot(options = {}) {
        this.assertDriver(options);
        return {
            module: GraphQLModule_1,
            providers: [
                {
                    provide: graphql_constants_1.GRAPHQL_MODULE_OPTIONS,
                    useValue: options,
                },
                {
                    provide: abstract_graphql_driver_1.AbstractGraphQLDriver,
                    useClass: options.driver,
                },
            ],
        };
    }
    static forRootAsync(options) {
        this.assertDriver(options);
        return {
            module: GraphQLModule_1,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options),
                {
                    provide: graphql_constants_1.GRAPHQL_MODULE_ID,
                    useValue: (0, utils_1.generateString)(),
                },
                {
                    provide: abstract_graphql_driver_1.AbstractGraphQLDriver,
                    useClass: options.driver,
                },
            ],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: graphql_constants_1.GRAPHQL_MODULE_OPTIONS,
                useFactory: async (...args) => await options.useFactory(...args),
                inject: options.inject || [],
            };
        }
        return {
            provide: graphql_constants_1.GRAPHQL_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createGqlOptions(),
            inject: [options.useExisting || options.useClass],
        };
    }
    async onModuleInit() {
        var _a;
        const httpAdapter = (_a = this.httpAdapterHost) === null || _a === void 0 ? void 0 : _a.httpAdapter;
        if (!httpAdapter) {
            return;
        }
        const options = await this._graphQlAdapter.mergeDefaultOptions(this.options);
        const { typePaths } = options;
        const typeDefs = (await this.graphQlTypesLoader.mergeTypesByPaths(typePaths)) || [];
        const mergedTypeDefs = (0, utils_1.extend)(typeDefs, options.typeDefs);
        await this._graphQlAdapter.start({
            ...options,
            typeDefs: mergedTypeDefs,
        });
        if (options.path) {
            GraphQLModule_1.logger.log((0, messages_1.ROUTE_MAPPED_MESSAGE)(options.path, common_1.RequestMethod.POST));
        }
    }
    static assertDriver(options) {
        if (!options.driver) {
            const errorMessage = `Missing "driver" option. In the latest version of "@nestjs/graphql" package (v10) a new required configuration property called "driver" has been introduced. Check out the official documentation for more details on how to migrate (https://docs.nestjs.com/graphql/migration-guide). Example:

GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
})`;
            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
    }
};
GraphQLModule.logger = new common_1.Logger(GraphQLModule_1.name, { timestamp: true });
GraphQLModule = GraphQLModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [schema_builder_module_1.GraphQLSchemaBuilderModule],
        providers: [
            graphql_factory_1.GraphQLFactory,
            metadata_scanner_1.MetadataScanner,
            services_1.ResolversExplorerService,
            services_1.ScalarsExplorerService,
            graphql_ast_explorer_1.GraphQLAstExplorer,
            graphql_types_loader_1.GraphQLTypesLoader,
            graphql_schema_builder_1.GraphQLSchemaBuilder,
            graphql_schema_host_1.GraphQLSchemaHost,
            graphql_federation_factory_1.GraphQLFederationFactory,
        ],
        exports: [
            graphql_types_loader_1.GraphQLTypesLoader,
            graphql_ast_explorer_1.GraphQLAstExplorer,
            graphql_schema_host_1.GraphQLSchemaHost,
            graphql_federation_factory_1.GraphQLFederationFactory,
        ],
    }),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_constants_1.GRAPHQL_MODULE_OPTIONS)),
    tslib_1.__metadata("design:paramtypes", [core_1.HttpAdapterHost, Object, abstract_graphql_driver_1.AbstractGraphQLDriver,
        graphql_types_loader_1.GraphQLTypesLoader])
], GraphQLModule);
exports.GraphQLModule = GraphQLModule;
