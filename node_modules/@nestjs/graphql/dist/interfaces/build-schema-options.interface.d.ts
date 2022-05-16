import { GraphQLDirective, GraphQLScalarType } from 'graphql';
import { FieldMiddleware } from './field-middleware.interface';
export declare type DateScalarMode = 'isoDate' | 'timestamp';
export declare type NumberScalarMode = 'float' | 'integer';
export interface ScalarsTypeMap {
    type: Function;
    scalar: GraphQLScalarType;
}
export interface BuildSchemaOptions {
    /**
     * Date scalar mode
     * @default 'isoDate'
     */
    dateScalarMode?: DateScalarMode;
    /**
     * Number scalar mode
     * @default 'float'
     */
    numberScalarMode?: NumberScalarMode;
    /**
     * Scalars map
     */
    scalarsMap?: ScalarsTypeMap[];
    /**
     * Orphaned type classes/enums that are not explicitly used in GraphQL types definitions
     */
    orphanedTypes?: (Function | object)[];
    /**
     * Disable checking on build the correctness of a schema
     */
    skipCheck?: boolean;
    /**
     * GraphQL directives
     */
    directives?: GraphQLDirective[];
    /**
     * Array of global field middleware functions
     */
    fieldMiddleware?: FieldMiddleware[];
}
//# sourceMappingURL=build-schema-options.interface.d.ts.map