"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntersectionType = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const decorators_1 = require("../decorators");
const get_fields_and_decorator_util_1 = require("../schema-builder/utils/get-fields-and-decorator.util");
const type_helpers_utils_1 = require("./type-helpers.utils");
function IntersectionType(classARef, classBRef, decorator) {
    const { decoratorFactory, fields: fieldsA } = (0, get_fields_and_decorator_util_1.getFieldsAndDecoratorForType)(classARef);
    const { fields: fieldsB } = (0, get_fields_and_decorator_util_1.getFieldsAndDecoratorForType)(classBRef);
    const fields = [...fieldsA, ...fieldsB];
    class IntersectionObjectType {
        constructor() {
            (0, mapped_types_1.inheritPropertyInitializers)(this, classARef);
            (0, mapped_types_1.inheritPropertyInitializers)(this, classBRef);
        }
    }
    if (decorator) {
        decorator({ isAbstract: true })(IntersectionObjectType);
    }
    else {
        decoratorFactory({ isAbstract: true })(IntersectionObjectType);
    }
    (0, mapped_types_1.inheritValidationMetadata)(classARef, IntersectionObjectType);
    (0, mapped_types_1.inheritTransformationMetadata)(classARef, IntersectionObjectType);
    (0, mapped_types_1.inheritValidationMetadata)(classBRef, IntersectionObjectType);
    (0, mapped_types_1.inheritTransformationMetadata)(classBRef, IntersectionObjectType);
    fields.forEach((item) => {
        (0, decorators_1.Field)(item.typeFn, { ...item.options })(IntersectionObjectType.prototype, item.name);
        (0, type_helpers_utils_1.applyFieldDecorators)(IntersectionObjectType, item);
    });
    Object.defineProperty(IntersectionObjectType, 'name', {
        value: `Intersection${classARef.name}${classBRef.name}`,
    });
    return IntersectionObjectType;
}
exports.IntersectionType = IntersectionType;
