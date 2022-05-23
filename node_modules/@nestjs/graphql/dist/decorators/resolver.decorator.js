"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
require("reflect-metadata");
const lazy_metadata_storage_1 = require("../schema-builder/storages/lazy-metadata.storage");
const type_metadata_storage_1 = require("../schema-builder/storages/type-metadata.storage");
const resolvers_utils_1 = require("./resolvers.utils");
/**
 * Extracts the name property set through the @ObjectType() decorator (if specified)
 * @param nameOrType type reference
 */
function getObjectOrInterfaceTypeNameIfExists(nameOrType) {
    const ctor = (0, resolvers_utils_1.getClassOrUndefined)(nameOrType);
    const objectTypesMetadata = type_metadata_storage_1.TypeMetadataStorage.getObjectTypesMetadata();
    const objectMetadata = objectTypesMetadata.find((type) => type.target === ctor);
    if (!objectMetadata) {
        const interfaceTypesMetadata = type_metadata_storage_1.TypeMetadataStorage.getInterfacesMetadata();
        const interfaceMetadata = interfaceTypesMetadata.find((type) => type.target === ctor);
        if (!interfaceMetadata) {
            return;
        }
        return interfaceMetadata.name;
    }
    return objectMetadata.name;
}
/**
 * Object resolver decorator.
 */
function Resolver(nameOrTypeOrOptions, options) {
    return (target, key, descriptor) => {
        const [nameOrType, resolverOptions] = typeof nameOrTypeOrOptions === 'object' && nameOrTypeOrOptions !== null
            ? [undefined, nameOrTypeOrOptions]
            : [nameOrTypeOrOptions, options];
        let name = nameOrType && (0, resolvers_utils_1.getClassName)(nameOrType);
        if ((0, shared_utils_1.isFunction)(nameOrType)) {
            const objectName = getObjectOrInterfaceTypeNameIfExists(nameOrType);
            objectName && (name = objectName);
        }
        (0, resolvers_utils_1.addResolverMetadata)(undefined, name, target, key, descriptor);
        if (!(0, shared_utils_1.isString)(nameOrType)) {
            lazy_metadata_storage_1.LazyMetadataStorage.store(target, () => {
                const typeFn = (0, resolvers_utils_1.getResolverTypeFn)(nameOrType, target);
                type_metadata_storage_1.TypeMetadataStorage.addResolverMetadata({
                    target: target,
                    typeFn: typeFn,
                    isAbstract: (resolverOptions && resolverOptions.isAbstract) || false,
                });
            });
        }
    };
}
exports.Resolver = Resolver;
