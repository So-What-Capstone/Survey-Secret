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
exports.QuestionUnionType = exports.QuestionUnion = exports.QuestionType = void 0;
const closed_question_schema_1 = require("./schemas/closed-question.schema");
const grid_question_scheam_1 = require("./schemas/grid-question.scheam");
const linear_question_schema_1 = require("./schemas/linear-question.schema");
const opened_question_schema_1 = require("./schemas/opened-question.schema");
const personal_question_schema_1 = require("./schemas/personal-question.schema");
const graphql_1 = require("@nestjs/graphql");
var QuestionType;
(function (QuestionType) {
    QuestionType["Closed"] = "Closed";
    QuestionType["Grid"] = "Grid";
    QuestionType["Linear"] = "Linear";
    QuestionType["Opened"] = "Opened";
    QuestionType["Personal"] = "Personal";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
(0, graphql_1.registerEnumType)(QuestionType, { name: 'QuestionType' });
exports.QuestionUnion = (0, graphql_1.createUnionType)({
    name: 'QuestionUnion',
    types: () => [
        closed_question_schema_1.ClosedQuestion,
        grid_question_scheam_1.GridQuestion,
        linear_question_schema_1.LinearQuestion,
        opened_question_schema_1.OpenedQuestion,
        personal_question_schema_1.PersonalQuestion,
    ],
    resolveType: (obj, context, info) => {
        if (obj.choices) {
            return closed_question_schema_1.ClosedQuestion;
        }
        else if (obj.rowContent) {
            return grid_question_scheam_1.GridQuestion;
        }
        else if (obj.leftRange) {
            return linear_question_schema_1.LinearQuestion;
        }
        else if (obj.encoded) {
            return personal_question_schema_1.PersonalQuestion;
        }
        else if (obj.type) {
            return opened_question_schema_1.OpenedQuestion;
        }
        else {
            return null;
        }
    },
});
let QuestionUnionType = class QuestionUnionType {
};
__decorate([
    (0, graphql_1.Field)((type) => exports.QuestionUnion),
    __metadata("design:type", Object)
], QuestionUnionType.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)((type) => QuestionType),
    __metadata("design:type", String)
], QuestionUnionType.prototype, "type", void 0);
QuestionUnionType = __decorate([
    (0, graphql_1.ObjectType)()
], QuestionUnionType);
exports.QuestionUnionType = QuestionUnionType;
//# sourceMappingURL=question.typeDefs.js.map