"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const enum_1 = require("../ts/enum");
const use = (middleware) => {
    return (target, key, desc) => {
        const middlewares = Reflect.getMetadata(enum_1.MetadataKeys.middleware, target, key) || [];
        Reflect.defineMetadata(enum_1.MetadataKeys.middleware, [...middlewares, middleware], target, key);
    };
};
exports.use = use;
