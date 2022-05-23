"use strict";
// This file is copied from `apollo-tooling`. The only difference is that it has a hack to not remove federation specific properties.
// The changed lines are 31-40 and 85-87 and the original file can be found here:
// https://github.com/apollographql/apollo-tooling/blob/master/packages/apollo-graphql/src/schema/transformSchema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSchema = void 0;
const graphql_1 = require("graphql");
function transformSchema(schema, transformType) {
    const typeMap = Object.create(null);
    for (const oldType of Object.values(schema.getTypeMap())) {
        if ((0, graphql_1.isIntrospectionType)(oldType))
            continue;
        const result = transformType(oldType);
        // Returning `null` removes the type.
        if (result === null)
            continue;
        // Returning `undefined` keeps the old type.
        const newType = result || oldType;
        typeMap[newType.name] = recreateNamedType(newType);
    }
    const schemaConfig = schema.toConfig();
    return new graphql_1.GraphQLSchema({
        ...schemaConfig,
        types: Object.values(typeMap),
        query: replaceMaybeType(schemaConfig.query),
        mutation: replaceMaybeType(schemaConfig.mutation),
        subscription: replaceMaybeType(schemaConfig.subscription),
    });
    function recreateNamedType(type) {
        if ((0, graphql_1.isObjectType)(type)) {
            const config = type.toConfig();
            const objectType = new graphql_1.GraphQLObjectType({
                ...config,
                interfaces: () => config.interfaces.map(replaceNamedType),
                fields: () => replaceFields(config.fields),
            });
            if (type.resolveReference) {
                objectType.resolveReference = type.resolveReference;
            }
            return objectType;
        }
        else if ((0, graphql_1.isInterfaceType)(type)) {
            const config = type.toConfig();
            return new graphql_1.GraphQLInterfaceType({
                ...config,
                fields: () => replaceFields(config.fields),
            });
        }
        else if ((0, graphql_1.isUnionType)(type)) {
            const config = type.toConfig();
            return new graphql_1.GraphQLUnionType({
                ...config,
                types: () => config.types.map(replaceNamedType),
            });
        }
        else if ((0, graphql_1.isInputObjectType)(type)) {
            const config = type.toConfig();
            return new graphql_1.GraphQLInputObjectType({
                ...config,
                fields: () => replaceInputFields(config.fields),
            });
        }
        return type;
    }
    function replaceType(type) {
        if ((0, graphql_1.isListType)(type)) {
            return new graphql_1.GraphQLList(replaceType(type.ofType));
        }
        else if ((0, graphql_1.isNonNullType)(type)) {
            return new graphql_1.GraphQLNonNull(replaceType(type.ofType));
        }
        return replaceNamedType(type);
    }
    function replaceNamedType(type) {
        const newType = typeMap[type.name];
        return newType ? newType : type;
    }
    function replaceMaybeType(type) {
        return type ? replaceNamedType(type) : undefined;
    }
    function replaceFields(fieldsMap) {
        return mapValues(fieldsMap, (field) => ({
            ...field,
            type: replaceType(field.type),
            args: field.args ? replaceArgs(field.args) : undefined,
        }));
    }
    function replaceInputFields(fieldsMap) {
        return mapValues(fieldsMap, (field) => ({
            ...field,
            type: replaceType(field.type),
        }));
    }
    function replaceArgs(args) {
        return mapValues(args, (arg) => ({
            ...arg,
            type: replaceType(arg.type),
        }));
    }
}
exports.transformSchema = transformSchema;
function mapValues(object, callback) {
    const result = Object.create(null);
    for (const [key, value] of Object.entries(object)) {
        result[key] = callback(value);
    }
    return result;
}
