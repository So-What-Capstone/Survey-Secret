"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMetadataStorage = exports.TypeMetadataStorageHost = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const field_decorator_1 = require("../../decorators/field.decorator");
const plugin_constants_1 = require("../../plugin/plugin-constants");
const cannot_determine_host_type_error_1 = require("../errors/cannot-determine-host-type.error");
const undefined_type_error_1 = require("../errors/undefined-type.error");
const is_target_equal_util_1 = require("../utils/is-target-equal-util");
const is_throwing_util_1 = require("../utils/is-throwing.util");
class TypeMetadataStorageHost {
    constructor() {
        /**
         * The implementation of this class has been heavily inspired by the following code:
         * @ref https://github.com/MichalLytek/type-graphql/blob/master/src/metadata/metadata-storage.ts
         */
        this.queries = new Array();
        this.mutations = new Array();
        this.subscriptions = new Array();
        this.fieldResolvers = new Array();
        this.resolvers = new Array();
        this.fields = new Array();
        this.params = new Array();
        this.interfaces = new Array();
        this.enums = new Array();
        this.unions = new Array();
        this.classDirectives = new Array();
        this.fieldDirectives = new Array();
        this.classExtensions = new Array();
        this.fieldExtensions = new Array();
        this.objectTypes = new Array();
        this.inputTypes = new Array();
        this.argumentTypes = new Array();
    }
    addMutationMetadata(metadata) {
        this.mutations.push(metadata);
    }
    getMutationsMetadata() {
        return this.mutations;
    }
    addQueryMetadata(metadata) {
        this.queries.push(metadata);
    }
    getQueriesMetadata() {
        return this.queries;
    }
    addSubscriptionMetadata(metadata) {
        this.subscriptions.push(metadata);
    }
    getSubscriptionsMetadata() {
        return this.subscriptions;
    }
    addResolverPropertyMetadata(metadata) {
        this.fieldResolvers.push(metadata);
    }
    addArgsMetadata(metadata) {
        this.argumentTypes.push(metadata);
    }
    getArgumentsMetadata() {
        return this.argumentTypes;
    }
    getArgumentsMetadataByTarget(target) {
        return this.argumentTypes.find((item) => item.target === target);
    }
    addInterfaceMetadata(metadata) {
        this.interfaces.push(metadata);
    }
    getInterfacesMetadata() {
        return this.interfaces;
    }
    getInterfaceMetadataByTarget(target) {
        return this.interfaces.find((item) => item.target === target);
    }
    addInputTypeMetadata(metadata) {
        this.inputTypes.push(metadata);
    }
    getInputTypesMetadata() {
        return this.inputTypes;
    }
    getInputTypeMetadataByTarget(target) {
        return this.inputTypes.find((item) => item.target === target);
    }
    addObjectTypeMetadata(metadata) {
        this.objectTypes.push(metadata);
    }
    getObjectTypesMetadata() {
        return this.objectTypes;
    }
    getObjectTypeMetadataByTarget(target) {
        return this.objectTypes.find((item) => item.target === target);
    }
    addEnumMetadata(metadata) {
        this.enums.push(metadata);
    }
    getEnumsMetadata() {
        return this.enums;
    }
    addUnionMetadata(metadata) {
        this.unions.push(metadata);
    }
    getUnionsMetadata() {
        return this.unions;
    }
    addDirectiveMetadata(metadata) {
        const exist = this.fieldDirectives.some((directiveMetadata) => {
            return (directiveMetadata.sdl === metadata.sdl &&
                directiveMetadata.target === metadata.target);
        });
        if (!exist) {
            this.classDirectives.push(metadata);
        }
    }
    addDirectivePropertyMetadata(metadata) {
        const exist = this.fieldDirectives.some((directiveMetadata) => {
            return (directiveMetadata.fieldName === metadata.fieldName &&
                directiveMetadata.sdl === metadata.sdl &&
                directiveMetadata.target === metadata.target);
        });
        if (!exist) {
            this.fieldDirectives.push(metadata);
        }
    }
    addExtensionsMetadata(metadata) {
        this.classExtensions.push(metadata);
    }
    addExtensionsPropertyMetadata(metadata) {
        this.fieldExtensions.push(metadata);
    }
    addResolverMetadata(metadata) {
        this.resolvers.push(metadata);
    }
    addClassFieldMetadata(metadata) {
        const existingMetadata = this.fields.find((item) => item.target === metadata.target && item.name === metadata.name);
        if (existingMetadata) {
            const options = existingMetadata.options;
            // inherit nullable option
            if ((0, shared_utils_1.isUndefined)(options.nullable) && (0, shared_utils_1.isUndefined)(options.defaultValue)) {
                options.nullable = metadata.options.nullable;
            }
        }
        else {
            this.fields.push(metadata);
        }
    }
    addMethodParamMetadata(metadata) {
        this.params.unshift(metadata);
    }
    compile(orphanedTypes = []) {
        this.classDirectives.reverse();
        this.classExtensions.reverse();
        this.fieldDirectives.reverse();
        this.fieldExtensions.reverse();
        const classMetadata = [
            ...this.objectTypes,
            ...this.inputTypes,
            ...this.argumentTypes,
            ...this.interfaces,
        ];
        this.loadClassPluginMetadata(classMetadata);
        this.compileClassMetadata(classMetadata);
        this.compileFieldResolverMetadata(this.fieldResolvers);
        const resolversMetadata = [
            ...this.queries,
            ...this.mutations,
            ...this.subscriptions,
        ];
        this.compileResolversMetadata(resolversMetadata);
        this.compileExtendedResolversMetadata();
        orphanedTypes.forEach((type) => 'prototype' in type && this.applyPluginMetadata(type.prototype));
    }
    loadClassPluginMetadata(metadata) {
        metadata
            .filter((item) => item === null || item === void 0 ? void 0 : item.target)
            .forEach((item) => this.applyPluginMetadata(item.target.prototype));
    }
    applyPluginMetadata(prototype) {
        do {
            if (!prototype.constructor) {
                return;
            }
            if (!prototype.constructor[plugin_constants_1.METADATA_FACTORY_NAME]) {
                continue;
            }
            const metadata = prototype.constructor[plugin_constants_1.METADATA_FACTORY_NAME]();
            const properties = Object.keys(metadata);
            properties.forEach((key) => {
                if (metadata[key].type) {
                    const { type, ...options } = metadata[key];
                    (0, field_decorator_1.addFieldMetadata)(type, options, prototype, key, undefined, true);
                }
                else {
                    (0, field_decorator_1.addFieldMetadata)(metadata[key], undefined, prototype, key, undefined, true);
                }
            });
        } while ((prototype = Reflect.getPrototypeOf(prototype)) &&
            prototype !== Object.prototype &&
            prototype);
    }
    compileClassMetadata(metadata) {
        metadata.forEach((item) => {
            const belongsToClass = is_target_equal_util_1.isTargetEqual.bind(undefined, item);
            if (!item.properties) {
                item.properties = this.getClassFieldsByPredicate(belongsToClass);
            }
            if (!item.directives) {
                item.directives = this.classDirectives.filter(belongsToClass);
            }
            if (!item.extensions) {
                item.extensions = this.classExtensions
                    .filter(belongsToClass)
                    .reduce((curr, acc) => ({ ...curr, ...acc.value }), {});
            }
        });
    }
    clear() {
        Object.assign(this, new TypeMetadataStorageHost());
    }
    getClassFieldsByPredicate(belongsToClass) {
        const fields = this.fields.filter(belongsToClass);
        fields.forEach((field) => {
            const isHostEqual = is_target_equal_util_1.isTargetEqual.bind(undefined, field);
            field.methodArgs = this.params.filter((param) => isHostEqual(param) && field.name === param.methodName);
            field.directives = this.fieldDirectives.filter(this.isFieldDirectiveOrExtension.bind(this, field));
            field.extensions = this.fieldExtensions
                .filter(this.isFieldDirectiveOrExtension.bind(this, field))
                .reduce((curr, acc) => ({ ...curr, ...acc.value }), {});
        });
        return fields;
    }
    compileResolversMetadata(metadata) {
        metadata.forEach((item) => {
            const isTypeEqual = is_target_equal_util_1.isTargetEqual.bind(undefined, item);
            const resolverMetadata = this.resolvers.find(isTypeEqual);
            item.classMetadata = resolverMetadata;
            item.methodArgs = this.params.filter((param) => isTypeEqual(param) && item.methodName === param.methodName);
            item.directives = this.fieldDirectives.filter(this.isFieldDirectiveOrExtension.bind(this, item));
            item.extensions = this.fieldExtensions
                .filter(this.isFieldDirectiveOrExtension.bind(this, item))
                .reduce((curr, acc) => ({ ...curr, ...acc.value }), {});
        });
    }
    compileFieldResolverMetadata(metadata) {
        this.compileResolversMetadata(metadata);
        metadata.forEach((item) => {
            const belongsToClass = is_target_equal_util_1.isTargetEqual.bind(undefined, item);
            item.directives = this.fieldDirectives.filter(this.isFieldDirectiveOrExtension.bind(this, item));
            item.extensions = this.fieldExtensions
                .filter(this.isFieldDirectiveOrExtension.bind(this, item))
                .reduce((curr, acc) => ({ ...curr, ...acc.value }), {});
            item.objectTypeFn =
                item.kind === 'external'
                    ? this.resolvers.find(belongsToClass).typeFn
                    : () => item.target;
            if (item.kind === 'external') {
                this.compileExternalFieldResolverMetadata(item);
            }
        });
    }
    compileExternalFieldResolverMetadata(item) {
        const objectTypeRef = this.resolvers
            .find((el) => (0, is_target_equal_util_1.isTargetEqual)(el, item))
            .typeFn();
        const objectOrInterfaceTypeMetadata = this.objectTypes.find((objTypeDef) => objTypeDef.target === objectTypeRef) ||
            this.interfaces.find((interfaceTypeDef) => interfaceTypeDef.target === objectTypeRef);
        if (!objectOrInterfaceTypeMetadata) {
            throw new cannot_determine_host_type_error_1.CannotDetermineHostTypeError(item.schemaName, objectTypeRef === null || objectTypeRef === void 0 ? void 0 : objectTypeRef.name);
        }
        const objectOrInterfaceTypeField = objectOrInterfaceTypeMetadata.properties.find((fieldDef) => fieldDef.name === item.methodName);
        if (!objectOrInterfaceTypeField) {
            if (!item.typeFn || !item.typeOptions) {
                throw new undefined_type_error_1.UndefinedTypeError(item.target.name, item.methodName);
            }
            const fieldMetadata = {
                name: item.methodName,
                schemaName: item.schemaName,
                deprecationReason: item.deprecationReason,
                description: item.description,
                typeFn: item.typeFn,
                target: objectTypeRef,
                options: item.typeOptions,
                methodArgs: item.methodArgs,
                directives: item.directives,
                extensions: item.extensions,
                complexity: item.complexity,
            };
            this.addClassFieldMetadata(fieldMetadata);
            objectOrInterfaceTypeMetadata.properties.push(fieldMetadata);
        }
        else {
            const isEmpty = (arr) => arr.length === 0;
            if (isEmpty(objectOrInterfaceTypeField.methodArgs)) {
                objectOrInterfaceTypeField.methodArgs = item.methodArgs;
            }
            if (isEmpty(objectOrInterfaceTypeField.directives)) {
                objectOrInterfaceTypeField.directives = item.directives;
            }
            if (!objectOrInterfaceTypeField.extensions) {
                objectOrInterfaceTypeField.extensions = item.extensions;
            }
            objectOrInterfaceTypeField.complexity =
                item.complexity === undefined
                    ? objectOrInterfaceTypeField.complexity
                    : item.complexity;
        }
    }
    compileExtendedResolversMetadata() {
        this.resolvers.forEach((item) => {
            let parentClass = Object.getPrototypeOf(item.target);
            while (parentClass.prototype) {
                const parentMetadata = this.resolvers.find((item) => item.target === parentClass);
                if (parentMetadata) {
                    this.queries = this.mergeParentResolverHandlers(this.queries, parentClass, item);
                    this.mutations = this.mergeParentResolverHandlers(this.mutations, parentClass, item);
                    this.subscriptions = this.mergeParentResolverHandlers(this.subscriptions, parentClass, item);
                    this.fieldResolvers = this.mergeParentFieldHandlers(this.fieldResolvers, parentClass, item);
                }
                parentClass = Object.getPrototypeOf(parentClass);
            }
        });
    }
    isFieldDirectiveOrExtension(host, metadata) {
        return (metadata.target === host.target &&
            metadata.fieldName === (host.methodName || host.name));
    }
    mergeParentResolverHandlers(metadata, parentClass, classMetadata) {
        const mergedMetadata = metadata.map((metadata) => {
            return metadata.target !== parentClass
                ? metadata
                : {
                    ...metadata,
                    target: classMetadata.target,
                    classMetadata,
                };
        });
        return mergedMetadata;
    }
    mergeParentFieldHandlers(metadata, parentClass, classMetadata) {
        const parentMetadata = this.mergeParentResolverHandlers(metadata, parentClass, classMetadata);
        const mergedMetadata = parentMetadata.map((metadata) => {
            return metadata.target === parentClass
                ? metadata
                : {
                    ...metadata,
                    objectTypeFn: (0, is_throwing_util_1.isThrowing)(metadata.objectTypeFn)
                        ? classMetadata.typeFn
                        : metadata.objectTypeFn,
                };
        });
        return mergedMetadata;
    }
}
exports.TypeMetadataStorageHost = TypeMetadataStorageHost;
const globalRef = global;
exports.TypeMetadataStorage = globalRef.GqlTypeMetadataStorage ||
    (globalRef.GqlTypeMetadataStorage = new TypeMetadataStorageHost());
