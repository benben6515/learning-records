"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const AppRouter_1 = require("../../AppRouter");
const enum_1 = require("../../ts/enum");
const bodyValidators = (keys) => {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(422).send('Invalid request');
        }
        for (let key of keys) {
            if (req.body[key]) {
                return res.status(422).send('Invalid request');
            }
        }
        next();
    };
};
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(enum_1.MetadataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(enum_1.MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(enum_1.MetadataKeys.middleware, target, key) || [];
            const requireBodyProps = Reflect.getMetadata(enum_1.MetadataKeys.validator, target.prototype, key) || [];
            const validator = bodyValidators(requireBodyProps);
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
        }
    };
}
exports.controller = controller;
