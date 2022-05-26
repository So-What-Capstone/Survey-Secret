import * as ts from 'typescript';
import { PluginOptions } from '../merge-options';
export declare class ModelClassVisitor {
    visit(sourceFile: ts.SourceFile, ctx: ts.TransformationContext, program: ts.Program, pluginOptions: PluginOptions): ts.SourceFile;
    clearMetadataOnRestart(node: ts.ClassDeclaration): void;
    addMetadataFactory(node: ts.ClassDeclaration): ts.ClassDeclaration;
    inspectPropertyDeclaration(compilerNode: ts.PropertyDeclaration, typeChecker: ts.TypeChecker, hostFilename: string, sourceFile: ts.SourceFile, pluginOptions: PluginOptions): void;
    createDecoratorObjectLiteralExpr(node: ts.PropertyDeclaration | ts.PropertySignature, typeChecker: ts.TypeChecker, existingProperties?: ts.NodeArray<ts.PropertyAssignment>, hostFilename?: string, sourceFile?: ts.SourceFile, pluginOptions?: PluginOptions): ts.ObjectLiteralExpression;
    createTypePropertyAssignment(node: ts.TypeNode, typeChecker: ts.TypeChecker, existingProperties: ts.NodeArray<ts.PropertyAssignment>, hostFilename: string, sourceFile?: ts.SourceFile, pluginOptions?: PluginOptions): ts.PropertyAssignment;
    addClassMetadata(node: ts.PropertyDeclaration, objectLiteral: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile): void;
    getClassMetadata(node: ts.ClassDeclaration): any;
    updateImports(sourceFile: ts.SourceFile, pathsToImport: string[]): ts.SourceFile;
    createDescriptionPropertyAssigment(node: ts.PropertyDeclaration | ts.PropertySignature, existingProperties?: ts.NodeArray<ts.PropertyAssignment>, options?: PluginOptions, sourceFile?: ts.SourceFile): ts.PropertyAssignment;
}
//# sourceMappingURL=model-class.visitor.d.ts.map