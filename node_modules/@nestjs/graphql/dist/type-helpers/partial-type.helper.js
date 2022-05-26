"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialType = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const mapped_types_1 = require("@nestjs/mapped-types");
const decorators_1 = require("../decorators");
const plugin_constants_1 = require("../plugin/plugin-constants");
const get_fields_and_decorator_util_1 = require("../schema-builder/utils/get-fields-and-decorator.util");
const type_helpers_utils_1 = require("./type-helpers.utils");
function PartialType(classRef, decorator) {
    const { fields, decoratorFactory } = (0, get_fields_and_decorator_util_1.getFieldsAndDecoratorForType)(classRef);
    class PartialObjectType {
        constructor() {
            (0, mapped_types_1.inheritPropertyInitializers)(this, classRef);
        }
    }
    if (decorator) {
        decorator({ isAbstract: true })(PartialObjectType);
    }
    else {
        decoratorFactory({ isAbstract: true })(PartialObjectType);
    }
    (0, mapped_types_1.inheritValidationMetadata)(classRef, PartialObjectType);
    (0, mapped_types_1.inheritTransformationMetadata)(classRef, PartialObjectType);
    fields.forEach((item) => {
        if ((0, shared_utils_1.isFunction)(item.typeFn)) {
            /**
             * Execute type function eagarly to update the type options object (before "clone" operation)
             * when the passed function (e.g., @Field(() => Type)) lazily returns an array.
             */
            item.typeFn();
        }
        (0, decorators_1.Field)(item.typeFn, { ...item.options, nullable: true })(PartialObjectType.prototype, item.name);
        (0, mapped_types_1.applyIsOptionalDecorator)(PartialObjectType, item.name);
        (0, type_helpers_utils_1.applyFieldDecorators)(PartialObjectType, item);
    });
    if (PartialObjectType[plugin_constants_1.METADATA_FACTORY_NAME]) {
        const pluginFields = Object.keys(PartialObjectType[plugin_constants_1.METADATA_FACTORY_NAME]());
        pluginFields.forEach((key) => (0, mapped_types_1.applyIsOptionalDecorator)(PartialObjectType, key));
    }
    Object.defineProperty(PartialObjectType, 'name', {
        value: `Partial${classRef.name}`,
    });
    return PartialObjectType;
}
exports.PartialType = PartialType;
