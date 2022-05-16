"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLAstExplorer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const graphql_constants_1 = require("./graphql.constants");
let tsMorphLib;
let GraphQLAstExplorer = class GraphQLAstExplorer {
    constructor() {
        this.root = ['Query', 'Mutation', 'Subscription'];
    }
    async explore(documentNode, outputPath, mode, options = {}) {
        if (!documentNode) {
            return;
        }
        tsMorphLib = await Promise.resolve().then(() => require('ts-morph'));
        const tsAstHelper = new tsMorphLib.Project({
            manipulationSettings: {
                newLineKind: process.platform === 'win32'
                    ? tsMorphLib.NewLineKind.CarriageReturnLineFeed
                    : tsMorphLib.NewLineKind.LineFeed,
            },
        });
        const tsFile = tsAstHelper.createSourceFile(outputPath, '', {
            overwrite: true,
        });
        let { definitions } = documentNode;
        definitions = (0, lodash_1.sortBy)(definitions, ['kind', 'name']);
        definitions.forEach((item) => this.lookupDefinition(item, tsFile, mode, options));
        const header = options.additionalHeader
            ? `${graphql_constants_1.DEFINITIONS_FILE_HEADER}\n${options.additionalHeader}\n\n`
            : graphql_constants_1.DEFINITIONS_FILE_HEADER;
        tsFile.insertText(0, header);
        tsFile.addTypeAlias({
            name: 'Nullable',
            isExported: false,
            type: 'T | null',
            typeParameters: [
                {
                    name: 'T',
                },
            ],
        });
        return tsFile;
    }
    lookupDefinition(item, tsFile, mode, options) {
        switch (item.kind) {
            case 'SchemaDefinition':
                return this.lookupRootSchemaDefinition(item.operationTypes, tsFile, mode);
            case 'ObjectTypeDefinition':
            case 'ObjectTypeExtension':
            case 'InputObjectTypeDefinition':
            case 'InputObjectTypeExtension':
                return this.addObjectTypeDefinition(item, tsFile, mode, options);
            case 'InterfaceTypeDefinition':
            case 'InterfaceTypeExtension':
                return this.addObjectTypeDefinition(item, tsFile, 'interface', options);
            case 'ScalarTypeDefinition':
            case 'ScalarTypeExtension':
                return this.addScalarDefinition(item, tsFile, options);
            case 'EnumTypeDefinition':
            case 'EnumTypeExtension':
                return this.addEnumDefinition(item, tsFile, options);
            case 'UnionTypeDefinition':
            case 'UnionTypeExtension':
                return this.addUnionDefinition(item, tsFile);
        }
    }
    lookupRootSchemaDefinition(operationTypes, tsFile, mode) {
        const structureKind = mode === 'class'
            ? tsMorphLib.StructureKind.Class
            : tsMorphLib.StructureKind.Interface;
        const rootInterface = this.addClassOrInterface(tsFile, mode, {
            name: 'ISchema',
            isExported: true,
            kind: structureKind,
        });
        operationTypes.forEach((item) => {
            if (!item) {
                return;
            }
            const tempOperationName = item.operation;
            const typeName = (0, lodash_1.get)(item, 'type.name.value');
            const interfaceName = typeName || tempOperationName;
            const interfaceRef = this.addClassOrInterface(tsFile, mode, {
                name: this.addSymbolIfRoot((0, lodash_1.upperFirst)(interfaceName)),
                isExported: true,
                kind: structureKind,
            });
            rootInterface.addProperty({
                name: interfaceName,
                type: interfaceRef.getName(),
            });
        });
    }
    addObjectTypeDefinition(item, tsFile, mode, options) {
        const parentName = (0, lodash_1.get)(item, 'name.value');
        if (!parentName) {
            return;
        }
        let parentRef = this.getClassOrInterface(tsFile, mode, this.addSymbolIfRoot(parentName));
        if (!parentRef) {
            const structureKind = mode === 'class'
                ? tsMorphLib.StructureKind.Class
                : tsMorphLib.StructureKind.Interface;
            const isRoot = this.root.indexOf(parentName) >= 0;
            parentRef = this.addClassOrInterface(tsFile, mode, {
                name: this.addSymbolIfRoot((0, lodash_1.upperFirst)(parentName)),
                isExported: true,
                isAbstract: isRoot && mode === 'class',
                kind: structureKind,
            });
        }
        const interfaces = (0, lodash_1.get)(item, 'interfaces');
        if (interfaces) {
            if (mode === 'class') {
                this.addImplementsInterfaces(interfaces, parentRef);
            }
            else {
                this.addExtendInterfaces(interfaces, parentRef);
            }
        }
        const isObjectType = item.kind === 'ObjectTypeDefinition';
        if (isObjectType && options.emitTypenameField) {
            parentRef.addProperty({
                name: '__typename',
                type: `'${parentRef.getName()}'`,
                hasQuestionToken: true,
            });
        }
        (item.fields || []).forEach((element) => {
            this.lookupFieldDefiniton(element, parentRef, mode, options);
        });
    }
    lookupFieldDefiniton(item, parentRef, mode, options) {
        switch (item.kind) {
            case 'FieldDefinition':
            case 'InputValueDefinition':
                return this.lookupField(item, parentRef, mode, options);
        }
    }
    lookupField(item, parentRef, mode, options) {
        const propertyName = (0, lodash_1.get)(item, 'name.value');
        if (!propertyName) {
            return;
        }
        const federatedFields = ['_entities', '_service'];
        if (federatedFields.includes(propertyName)) {
            return;
        }
        const { name: type, required } = this.getFieldTypeDefinition(item.type, options);
        if (!this.isRoot(parentRef.getName())) {
            parentRef.addProperty({
                name: propertyName,
                type,
                hasQuestionToken: !required,
            });
            return;
        }
        if (options.skipResolverArgs) {
            parentRef.addProperty({
                name: propertyName,
                type: this.addSymbolIfRoot(type),
                hasQuestionToken: !required,
            });
        }
        else {
            parentRef.addMethod({
                isAbstract: mode === 'class',
                name: propertyName,
                returnType: `${type} | Promise<${type}>`,
                parameters: this.getFunctionParameters(item.arguments, options),
            });
        }
    }
    getFieldTypeDefinition(typeNode, options) {
        const stringifyType = (typeNode) => {
            const { type, required } = this.unwrapTypeIfNonNull(typeNode);
            const isArray = type.kind === 'ListType';
            if (isArray) {
                const arrayType = (0, lodash_1.get)(type, 'type');
                return required
                    ? `${stringifyType(arrayType)}[]`
                    : `Nullable<${stringifyType(arrayType)}[]>`;
            }
            const typeName = this.addSymbolIfRoot((0, lodash_1.get)(type, 'name.value'));
            return required
                ? this.getType(typeName, options)
                : `Nullable<${this.getType(typeName, options)}>`;
        };
        const { required } = this.unwrapTypeIfNonNull(typeNode);
        return {
            name: stringifyType(typeNode),
            required,
        };
    }
    unwrapTypeIfNonNull(type) {
        const isNonNullType = type.kind === 'NonNullType';
        if (isNonNullType) {
            return {
                type: this.unwrapTypeIfNonNull((0, lodash_1.get)(type, 'type')).type,
                required: isNonNullType,
            };
        }
        return { type, required: false };
    }
    getType(typeName, options) {
        const defaults = this.getDefaultTypes(options);
        const isDefault = defaults[typeName];
        return isDefault ? defaults[typeName] : typeName;
    }
    getDefaultTypes(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return {
            String: (_b = (_a = options.defaultTypeMapping) === null || _a === void 0 ? void 0 : _a.String) !== null && _b !== void 0 ? _b : 'string',
            Int: (_d = (_c = options.defaultTypeMapping) === null || _c === void 0 ? void 0 : _c.Int) !== null && _d !== void 0 ? _d : 'number',
            Boolean: (_f = (_e = options.defaultTypeMapping) === null || _e === void 0 ? void 0 : _e.Boolean) !== null && _f !== void 0 ? _f : 'boolean',
            ID: (_h = (_g = options.defaultTypeMapping) === null || _g === void 0 ? void 0 : _g.ID) !== null && _h !== void 0 ? _h : 'string',
            Float: (_k = (_j = options.defaultTypeMapping) === null || _j === void 0 ? void 0 : _j.Float) !== null && _k !== void 0 ? _k : 'number',
        };
    }
    getFunctionParameters(inputs, options) {
        if (!inputs) {
            return [];
        }
        return inputs.map((element) => {
            const { name, required } = this.getFieldTypeDefinition(element.type, options);
            return {
                name: (0, lodash_1.get)(element, 'name.value'),
                type: name,
                hasQuestionToken: !required,
                kind: tsMorphLib.StructureKind.Parameter,
            };
        });
    }
    addScalarDefinition(item, tsFile, options) {
        var _a, _b;
        const name = (0, lodash_1.get)(item, 'name.value');
        if (!name || name === 'Date') {
            return;
        }
        const typeMapping = (_a = options.customScalarTypeMapping) === null || _a === void 0 ? void 0 : _a[name];
        const mappedTypeName = typeof typeMapping === 'string' ? typeMapping : typeMapping === null || typeMapping === void 0 ? void 0 : typeMapping.name;
        tsFile.addTypeAlias({
            name,
            type: (_b = mappedTypeName !== null && mappedTypeName !== void 0 ? mappedTypeName : options.defaultScalarType) !== null && _b !== void 0 ? _b : 'any',
            isExported: true,
        });
    }
    addExtendInterfaces(interfaces, parentRef) {
        if (!interfaces) {
            return;
        }
        interfaces.forEach((element) => {
            const interfaceName = (0, lodash_1.get)(element, 'name.value');
            if (interfaceName) {
                parentRef.addExtends(interfaceName);
            }
        });
    }
    addImplementsInterfaces(interfaces, parentRef) {
        if (!interfaces) {
            return;
        }
        interfaces.forEach((element) => {
            const interfaceName = (0, lodash_1.get)(element, 'name.value');
            if (interfaceName) {
                parentRef.addImplements(interfaceName);
            }
        });
    }
    addEnumDefinition(item, tsFile, options) {
        const name = (0, lodash_1.get)(item, 'name.value');
        if (!name) {
            return;
        }
        if (options.enumsAsTypes) {
            const values = item.values.map((value) => `"${(0, lodash_1.get)(value, 'name.value')}"`);
            return tsFile.addTypeAlias({
                name,
                type: values.join(' | '),
                isExported: true,
            });
        }
        const members = (0, lodash_1.map)(item.values, (value) => ({
            name: (0, lodash_1.get)(value, 'name.value'),
            value: (0, lodash_1.get)(value, 'name.value'),
        }));
        tsFile.addEnum({
            name,
            members,
            isExported: true,
        });
    }
    addUnionDefinition(item, tsFile) {
        const name = (0, lodash_1.get)(item, 'name.value');
        if (!name) {
            return;
        }
        const types = (0, lodash_1.map)(item.types, (value) => (0, lodash_1.get)(value, 'name.value'));
        tsFile.addTypeAlias({
            name,
            type: types.join(' | '),
            isExported: true,
        });
    }
    addSymbolIfRoot(name) {
        return this.root.indexOf(name) >= 0 ? `I${name}` : name;
    }
    isRoot(name) {
        return ['IQuery', 'IMutation', 'ISubscription'].indexOf(name) >= 0;
    }
    addClassOrInterface(tsFile, mode, options) {
        return mode === 'class'
            ? tsFile.addClass(options)
            : tsFile.addInterface(options);
    }
    getClassOrInterface(tsFile, mode, name) {
        return mode === 'class' ? tsFile.getClass(name) : tsFile.getInterface(name);
    }
};
GraphQLAstExplorer = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GraphQLAstExplorer);
exports.GraphQLAstExplorer = GraphQLAstExplorer;
