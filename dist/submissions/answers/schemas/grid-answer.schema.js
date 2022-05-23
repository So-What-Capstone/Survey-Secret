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
exports.GridAnswer = exports.GridAnswerContent = void 0;
const graphql_1 = require("@nestjs/graphql");
const answer_schema_1 = require("./answer.schema");
const mongoose_1 = require("@nestjs/mongoose");
let GridAnswerContent = class GridAnswerContent {
};
__decorate([
    (0, graphql_1.Field)((type) => Number),
    __metadata("design:type", Number)
], GridAnswerContent.prototype, "rowNo", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Number),
    __metadata("design:type", Number)
], GridAnswerContent.prototype, "colNo", void 0);
GridAnswerContent = __decorate([
    (0, graphql_1.InputType)('GridAnswerContentInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], GridAnswerContent);
exports.GridAnswerContent = GridAnswerContent;
let GridAnswer = class GridAnswer extends answer_schema_1.Answer {
};
__decorate([
    (0, graphql_1.Field)((type) => [GridAnswerContent], { nullable: true }),
    (0, mongoose_1.Prop)({
        type: [
            {
                rowNo: { type: Number },
                colNo: { type: Number },
            },
        ],
    }),
    __metadata("design:type", Array)
], GridAnswer.prototype, "content", void 0);
GridAnswer = __decorate([
    (0, graphql_1.InputType)('GridAnswerInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], GridAnswer);
exports.GridAnswer = GridAnswer;
//# sourceMappingURL=grid-answer.schema.js.map