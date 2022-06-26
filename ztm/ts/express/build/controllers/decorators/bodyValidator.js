"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
const enum_1 = require("../../ts/enum");
const bodyValidator = (...keys) => {
    return (target, key, desc) => {
        Reflect.defineMetadata(enum_1.MetadataKeys.validator, keys, target, key);
    };
};
exports.bodyValidator = bodyValidator;
