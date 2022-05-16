import { GraphQLNamedType, GraphQLSchema } from 'graphql';
declare module 'graphql/type/definition' {
    interface GraphQLObjectType {
        resolveReference?: any;
    }
    interface GraphQLObjectTypeConfig<TSource, TContext> {
        resolveReference?: any;
    }
}
declare type TypeTransformer = (type: GraphQLNamedType) => GraphQLNamedType | null | undefined;
export declare function transformSchema(schema: GraphQLSchema, transformType: TypeTransformer): GraphQLSchema;
export {};
//# sourceMappingURL=transform-schema.util.d.ts.map