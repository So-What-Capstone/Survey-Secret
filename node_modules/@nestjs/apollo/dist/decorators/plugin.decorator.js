"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const common_1 = require("@nestjs/common");
const apollo_constants_1 = require("../apollo.constants");
/**
 * Decorator that marks a class as an Apollo plugin.
 */
function Plugin() {
    return (target) => {
        (0, common_1.SetMetadata)(apollo_constants_1.PLUGIN_METADATA, true)(target);
    };
}
exports.Plugin = Plugin;
