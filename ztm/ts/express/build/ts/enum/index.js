"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataKeys = exports.Methods = void 0;
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["patch"] = "patch";
    Methods["del"] = "delete";
    Methods["put"] = "put";
})(Methods = exports.Methods || (exports.Methods = {}));
var MetadataKeys;
(function (MetadataKeys) {
    MetadataKeys["method"] = "method";
    MetadataKeys["path"] = "path";
    MetadataKeys["middleware"] = "middleware";
    MetadataKeys["validator"] = "validator";
})(MetadataKeys = exports.MetadataKeys || (exports.MetadataKeys = {}));
