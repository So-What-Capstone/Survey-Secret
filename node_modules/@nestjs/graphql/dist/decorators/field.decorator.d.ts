/**
 * The API surface of this module has been heavily inspired by the "type-graphql" library (https://github.com/MichalLytek/type-graphql), originally designed & released by Michal Lytek.
 * In the v6 major release of NestJS, we introduced the code-first approach as a compatibility layer between this package and the `@nestjs/graphql` module.
 * Eventually, our team decided to reimplement all the features from scratch due to a lack of flexibility.
 * To avoid numerous breaking changes, the public API is backward-compatible and may resemble "type-graphql".
 */
import { Complexity, FieldMiddleware } from '../interfaces';
import { BaseTypeOptions } from '../interfaces/base-type-options.interface';
import { ReturnTypeFunc } from '../interfaces/return-type-func.interface';
/**
 * Interface defining options that can be passed to `@Field()` decorator.
 */
export interface FieldOptions extends BaseTypeOptions {
    /**
     * Name of the field.
     */
    name?: string;
    /**
     * Description of the field.
     */
    description?: string;
    /**
     * Field deprecation reason (if deprecated).
     */
    deprecationReason?: string;
    /**
     * Field complexity options.
     */
    complexity?: Complexity;
    /**
     * Array of middleware to apply.
     */
    middleware?: FieldMiddleware[];
}
/**
 * @Field() decorator is used to mark a specific class property as a GraphQL field.
 * Only properties decorated with this decorator will be defined in the schema.
 */
export declare function Field(): PropertyDecorator & MethodDecorator;
/**
 * @Field() decorator is used to mark a specific class property as a GraphQL field.
 * Only properties decorated with this decorator will be defined in the schema.
 */
export declare function Field(options: FieldOptions): PropertyDecorator & MethodDecorator;
/**
 * @Field() decorator is used to mark a specific class property as a GraphQL field.
 * Only properties decorated with this decorator will be defined in the schema.
 */
export declare function Field(returnTypeFunction?: ReturnTypeFunc, options?: FieldOptions): PropertyDecorator & MethodDecorator;
export declare function addFieldMetadata(typeOrOptions: ReturnTypeFunc | FieldOptions, fieldOptions: FieldOptions, prototype: Object, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>, loadEagerly?: boolean): void;
//# sourceMappingURL=field.decorator.d.ts.map