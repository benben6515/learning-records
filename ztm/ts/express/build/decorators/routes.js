"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
const enum_1 = require("../ts/enum");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', 'get', target, key);
        };
    };
}
exports.get = routeBinder(enum_1.Methods.get);
exports.put = routeBinder(enum_1.Methods.put);
exports.post = routeBinder(enum_1.Methods.post);
exports.del = routeBinder(enum_1.Methods.del);
exports.path = routeBinder(enum_1.Methods.patch);
