"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const logger = (req, res, next) => {
    console.log('request was made!');
    next();
};
let LoginController = class LoginController {
    getLogin(req, res) {
        res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" type="text" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>login</button>
      <form>
    `);
    }
    postLogin(req, res) {
        const { email, password } = req.body;
        if (email && password && email === "hi@hi.com" && password === "password") {
            console.log(email + password);
            req.session = { loggedIn: true };
            res.redirect("/");
        }
        else {
            res.send("Invalid email or password");
        }
    }
    getLogout(req, res) {
        req.session = null;
        res.redirect("/");
    }
};
__decorate([
    (0, decorators_1.get)('/login'),
    (0, decorators_1.use)(logger),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogin", null);
__decorate([
    (0, decorators_1.post)('/login'),
    (0, decorators_1.bodyValidator)('email', 'password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "postLogin", null);
__decorate([
    (0, decorators_1.get)('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogout", null);
LoginController = __decorate([
    (0, decorators_1.controller)('/auth')
], LoginController);
