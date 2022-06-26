"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
class AppRouter {
    static getInstance() {
        if (!AppRouter.instance) {
            AppRouter.instance = (0, express_1.Router)();
        }
        return AppRouter.instance;
    }
}
exports.AppRouter = AppRouter;
