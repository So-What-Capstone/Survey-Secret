"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFieldDecorators = void 0;
const decorators_1 = require("../decorators");
function applyFieldDecorators(targetClass, item) {
    var _a;
    if (item.extensions) {
        (0, decorators_1.Extensions)(item.extensions)(targetClass.prototype, item.name);
    }
    if ((_a = item.directives) === null || _a === void 0 ? void 0 : _a.length) {
        item.directives.map((directive) => {
            (0, decorators_1.Directive)(directive.sdl)(targetClass.prototype, item.name);
        });
    }
}
exports.applyFieldDecorators = applyFieldDecorators;
