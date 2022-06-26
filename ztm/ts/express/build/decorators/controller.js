"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
require("reflect-metadata");
const express_1 = require("express");
const enum_1 = require("../ts/enum");
exports.router = (0, express_1.Router)();
function controller(routePrefix) {
    return function (target) {
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(enum_1.MetadataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(enum_1.MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(enum_1.MetadataKeys.middleware, target, key) || [];
            if (path) {
                exports.router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
            }
        }
    };
}
exports.controller = controller;
