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
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const util_1 = require("util");
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["Regular"] = "Regular";
    AccessLevel["Admin"] = "Admin";
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
class User {
}
exports.User = User;
class JWT {
}
JWT.verify = util_1.promisify(jsonwebtoken_1.verify).bind(JWT.verify);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 50),
    __metadata("design:type", String)
], JWT.prototype, "username", void 0);
__decorate([
    class_validator_1.IsIn(["Regular", "Admin"]),
    __metadata("design:type", String)
], JWT.prototype, "accessLevel", void 0);
exports.JWT = JWT;
//# sourceMappingURL=types.js.map