"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelClassVisitor = void 0;
const lodash_1 = require("lodash");
const ts = require("typescript");
const decorators_1 = require("../../decorators");
const plugin_constants_1 = require("../plugin-constants");
const ast_utils_1 = require("../utils/ast-utils");
const plugin_utils_1 = require("../utils/plugin-utils");
const metadataHostMap = new Map();
const importsToAddPerFile = new Map();
class ModelClassVisitor {
    visit(sourceFile, ctx, program, pluginOptions) {
        const typeChecker = program.getTypeChecker();
        const visitNode = (node) => {
            if (ts.isClassDeclaration(node)) {
                this.clearMetadataOnRestart(node);
                node = ts.visitEachChild(node, visitNode, ctx);
                return this.addMetadataFactory(node);
            }
            else if (ts.isPropertyDeclaration(node)) {
                const decorators = node.decorators;
                const hideField = (0, plugin_utils_1.getDecoratorOrUndefinedByNames)([decorators_1.HideField.name], decorators);
                if (hideField) {
                    return node;
                }
                const isPropertyStatic = (node.modifiers || []).some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword);
                if (isPropertyStatic) {
                    return node;
                }
                try {
                    this.inspectPropertyDeclaration(node, typeChecker, sourceFile.fileName, sourceFile, pluginOptions);
                }
                catch (err) {
                    return node;
                }
                return node;
            }
            else if (ts.isSourceFile(node)) {
                const visitedNode = ts.visitEachChild(node, visitNode, ctx);
                const importsToAdd = importsToAddPerFile.get(node.fileName);
                if (!importsToAdd) {
                    return visitedNode;
                }
                return this.updateImports(visitedNode, Array.from(importsToAdd));
            }
            return ts.visitEachChild(node, visitNode, ctx);
        };
        return ts.visitNode(sourceFile, visitNode);
    }
    clearMetadataOnRestart(node) {
        const classMetadata = this.getClassMetadata(node);
        if (classMetadata) {
            metadataHostMap.delete(node.name.getText());
        }
    }
    addMetadataFactory(node) {
        const classMutableNode = ts.getMutableClone(node);
        const classMetadata = this.getClassMetadata(node);
        const returnValue = classMetadata
            ? ts.createObjectLiteral(Object.keys(classMetadata).map((key) => ts.createPropertyAssignment(ts.createIdentifier(key), classMetadata[key])))
            : ts.createObjectLiteral([], false);
        const method = ts.createMethod(undefined, [ts.createModifier(ts.SyntaxKind.StaticKeyword)], undefined, ts.createIdentifier(plugin_constants_1.METADATA_FACTORY_NAME), undefined, undefined, [], undefined, ts.createBlock([ts.createReturn(returnValue)], true));
        classMutableNode.members = ts.createNodeArray([
            ...classMutableNode.members,
            method,
        ]);
        return classMutableNode;
    }
    inspectPropertyDeclaration(compilerNode, typeChecker, hostFilename, sourceFile, pluginOptions) {
        const objectLiteralExpr = this.createDecoratorObjectLiteralExpr(compilerNode, typeChecker, ts.createNodeArray(), hostFilename, sourceFile, pluginOptions);
        this.addClassMetadata(compilerNode, objectLiteralExpr, sourceFile);
    }
    createDecoratorObjectLiteralExpr(node, typeChecker, existingProperties = ts.createNodeArray(), hostFilename = '', sourceFile, pluginOptions) {
        const type = typeChecker.getTypeAtLocation(node);
        const isNullable = !!node.questionToken || (0, ast_utils_1.isNull)(type) || (0, ast_utils_1.isUndefined)(type);
        const properties = [
            ...existingProperties,
            !(0, plugin_utils_1.hasPropertyKey)('nullable', existingProperties) &&
                isNullable &&
                ts.createPropertyAssignment('nullable', ts.createLiteral(isNullable)),
            this.createTypePropertyAssignment(node.type, typeChecker, existingProperties, hostFilename, sourceFile, pluginOptions),
            this.createDescriptionPropertyAssigment(node, existingProperties, pluginOptions, sourceFile),
        ];
        const objectLiteral = ts.createObjectLiteral((0, lodash_1.compact)((0, lodash_1.flatten)(properties)));
        return objectLiteral;
    }
    createTypePropertyAssignment(node, typeChecker, existingProperties, hostFilename, sourceFile, pluginOptions) {
        const key = 'type';
        if ((0, plugin_utils_1.hasPropertyKey)(key, existingProperties)) {
            return undefined;
        }
        if (node) {
            if (ts.isTypeLiteralNode(node)) {
                const propertyAssignments = Array.from(node.members || []).map((member) => {
                    const literalExpr = this.createDecoratorObjectLiteralExpr(member, typeChecker, existingProperties, hostFilename, sourceFile, pluginOptions);
                    return ts.createPropertyAssignment(ts.createIdentifier(member.name.getText()), literalExpr);
                });
                return ts.createPropertyAssignment(key, ts.createArrowFunction(undefined, undefined, [], undefined, undefined, ts.createParen(ts.createObjectLiteral(propertyAssignments))));
            }
            else if (ts.isUnionTypeNode(node)) {
                const nullableType = (0, ast_utils_1.findNullableTypeFromUnion)(node, typeChecker);
                const remainingTypes = node.types.filter((item) => item !== nullableType);
                if (remainingTypes.length === 1) {
                    return this.createTypePropertyAssignment(remainingTypes[0], typeChecker, existingProperties, hostFilename);
                }
            }
        }
        const type = typeChecker.getTypeAtLocation(node);
        if (!type) {
            return undefined;
        }
        let typeReference = (0, plugin_utils_1.getTypeReferenceAsString)(type, typeChecker);
        if (!typeReference) {
            return undefined;
        }
        typeReference = (0, plugin_utils_1.replaceImportPath)(typeReference, hostFilename);
        if (typeReference && typeReference.includes('require')) {
            // add top-level import to eagarly load class metadata
            const importPath = /\(\"([^)]).+(\")/.exec(typeReference)[0];
            if (importPath) {
                let importsToAdd = importsToAddPerFile.get(hostFilename);
                if (!importsToAdd) {
                    importsToAdd = new Set();
                    importsToAddPerFile.set(hostFilename, importsToAdd);
                }
                importsToAdd.add(importPath.slice(2, importPath.length - 1));
            }
        }
        return ts.createPropertyAssignment(key, ts.createArrowFunction(undefined, undefined, [], undefined, undefined, ts.createIdentifier(typeReference)));
    }
    addClassMetadata(node, objectLiteral, sourceFile) {
        const hostClass = node.parent;
        const className = hostClass.name && hostClass.name.getText();
        if (!className) {
            return;
        }
        const existingMetadata = metadataHostMap.get(className) || {};
        const propertyName = node.name && node.name.getText(sourceFile);
        if (!propertyName ||
            (node.name && node.name.kind === ts.SyntaxKind.ComputedPropertyName)) {
            return;
        }
        metadataHostMap.set(className, {
            ...existingMetadata,
            [propertyName]: objectLiteral,
        });
    }
    getClassMetadata(node) {
        if (!node.name) {
            return;
        }
        return metadataHostMap.get(node.name.getText());
    }
    updateImports(sourceFile, pathsToImport) {
        var _a;
        const [major, minor] = (_a = ts.versionMajorMinor) === null || _a === void 0 ? void 0 : _a.split('.').map((x) => +x);
        const IMPORT_PREFIX = 'eager_import_';
        const importDeclarations = pathsToImport.map((path, index) => {
            if (major == 4 && minor >= 2) {
                // support TS v4.2+
                return ts.createImportEqualsDeclaration(undefined, undefined, false, IMPORT_PREFIX + index, ts.createExternalModuleReference(ts.createLiteral(path)));
            }
            return ts.createImportEqualsDeclaration(undefined, undefined, IMPORT_PREFIX + index, ts.createExternalModuleReference(ts.createLiteral(path)));
        });
        return ts.updateSourceFileNode(sourceFile, [
            ...importDeclarations,
            ...sourceFile.statements,
        ]);
    }
    createDescriptionPropertyAssigment(node, existingProperties = ts.createNodeArray(), options = {}, sourceFile) {
        if (!options.introspectComments || !sourceFile) {
            return;
        }
        const description = (0, ast_utils_1.getDescriptionOfNode)(node, sourceFile);
        const keyOfComment = 'description';
        if (!(0, plugin_utils_1.hasPropertyKey)(keyOfComment, existingProperties) && description) {
            const descriptionPropertyAssignment = ts.createPropertyAssignment(keyOfComment, ts.createLiteral(description));
            return descriptionPropertyAssignment;
        }
    }
}
exports.ModelClassVisitor = ModelClassVisitor;
