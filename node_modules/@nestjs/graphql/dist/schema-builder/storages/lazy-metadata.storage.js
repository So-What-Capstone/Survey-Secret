"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyMetadataStorage = exports.LazyMetadataStorageHost = void 0;
const common_1 = require("@nestjs/common");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const NO_TARGET_METADATA = Symbol('NO_TARGET_METADATA');
const FIELD_LAZY_METADATA = Symbol('FIELD_LAZY_METADATA');
class LazyMetadataStorageHost {
    constructor() {
        this.lazyMetadataByTarget = new Map();
    }
    store(targetOrFn, func, options) {
        if (func && (options === null || options === void 0 ? void 0 : options.isField)) {
            this.updateStorage(FIELD_LAZY_METADATA, func);
            this.updateStorage(targetOrFn, func);
        }
        else if (func) {
            this.updateStorage(targetOrFn, func);
        }
        else {
            this.updateStorage(NO_TARGET_METADATA, targetOrFn);
        }
    }
    load(types = [], options = {
        skipFieldLazyMetadata: false,
    }) {
        types = this.concatPrototypes(types);
        let loadersToExecute = (0, common_1.flatten)(types
            .map((target) => this.lazyMetadataByTarget.get(target))
            .filter((metadata) => metadata));
        loadersToExecute = loadersToExecute.concat(...(this.lazyMetadataByTarget.get(NO_TARGET_METADATA) || []));
        if (!options.skipFieldLazyMetadata) {
            loadersToExecute = loadersToExecute.concat(...(this.lazyMetadataByTarget.get(FIELD_LAZY_METADATA) || []));
        }
        loadersToExecute.forEach((func) => func());
    }
    concatPrototypes(types) {
        const typesWithPrototypes = types
            .filter((type) => type && type.prototype)
            .map((type) => {
            const parentTypes = [];
            let parent = type;
            while (!(0, shared_utils_1.isUndefined)(parent.prototype)) {
                parent = Object.getPrototypeOf(parent);
                if (parent === Function.prototype) {
                    break;
                }
                parentTypes.push(parent);
            }
            parentTypes.push(type);
            return parentTypes;
        });
        return (0, common_1.flatten)(typesWithPrototypes);
    }
    updateStorage(key, func) {
        const existingArray = this.lazyMetadataByTarget.get(key);
        if (existingArray) {
            existingArray.push(func);
        }
        else {
            this.lazyMetadataByTarget.set(key, [func]);
        }
    }
}
exports.LazyMetadataStorageHost = LazyMetadataStorageHost;
const globalRef = global;
exports.LazyMetadataStorage = globalRef.GqlLazyMetadataStorageHost ||
    (globalRef.GqlLazyMetadataStorageHost = new LazyMetadataStorageHost());
