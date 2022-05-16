"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGridQuestionOutput = exports.CreateGridQuestionInput = exports.CreateGridQuestionInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../../common/dtos/output.dto");
const grid_question_scheam_1 = require("../schemas/grid-question.scheam");
const common_create_question_dto_1 = require("./common-create-question.dto");
const question_typeDefs_1 = require("../question.typeDefs");
let CreateGridQuestionInputType = class CreateGridQuestionInputType extends (0, graphql_1.IntersectionType)(common_create_question_dto_1.CommonCreateQuestionInput, (0, graphql_1.PickType)(grid_question_scheam_1.GridQuestion, ['rowContent', 'colContent', 'type'])) {
};
CreateGridQuestionInputType = __decorate([
    (0, graphql_1.InputType)()
], CreateGridQuestionInputType);
exports.CreateGridQuestionInputType = CreateGridQuestionInputType;
let CreateGridQuestionInput = class CreateGridQuestionInput {
};
__decorate([
    (0, graphql_1.Field)((type) => CreateGridQuestionInputType),
    __metadata("design:type", CreateGridQuestionInputType)
], CreateGridQuestionInput.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)((type) => question_typeDefs_1.QuestionType),
    __metadata("design:type", String)
], CreateGridQuestionInput.prototype, "type", void 0);
CreateGridQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], CreateGridQuestionInput);
exports.CreateGridQuestionInput = CreateGridQuestionInput;
let CreateGridQuestionOutput = class CreateGridQuestionOutput extends output_dto_1.CoreOutput {
};
CreateGridQuestionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateGridQuestionOutput);
exports.CreateGridQuestionOutput = CreateGridQuestionOutput;
//# sourceMappingURL=create-grid-question.dto.js.map