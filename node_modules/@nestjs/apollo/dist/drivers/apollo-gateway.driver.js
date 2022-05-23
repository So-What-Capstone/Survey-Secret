"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloGatewayDriver = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const apollo_base_driver_1 = require("./apollo-base.driver");
let ApolloGatewayDriver = class ApolloGatewayDriver extends apollo_base_driver_1.ApolloBaseDriver {
    async start(options) {
        const { ApolloGateway } = (0, load_package_util_1.loadPackage)('@apollo/gateway', 'ApolloGateway', () => require('@apollo/gateway'));
        const { server: serverOpts = {}, gateway: gatewayOpts = {} } = options;
        const gateway = new ApolloGateway(gatewayOpts);
        await super.start({
            ...serverOpts,
            gateway,
        });
    }
    async mergeDefaultOptions(options) {
        var _a;
        return {
            ...options,
            server: await super.mergeDefaultOptions((_a = options === null || options === void 0 ? void 0 : options.server) !== null && _a !== void 0 ? _a : {}),
        };
    }
};
ApolloGatewayDriver = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ApolloGatewayDriver);
exports.ApolloGatewayDriver = ApolloGatewayDriver;
