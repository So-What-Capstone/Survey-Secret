import { Type } from '@nestjs/common';
import { GraphQLScalarType } from 'graphql';
export declare type GqlTypeReference = Type<any> | GraphQLScalarType | Function | object | symbol;
export declare type ReturnTypeFuncValue = GqlTypeReference | [GqlTypeReference];
export declare type ReturnTypeFunc = (returns?: void) => ReturnTypeFuncValue;
//# sourceMappingURL=return-type-func.interface.d.ts.map