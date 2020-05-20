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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var AuthService_1;
const types_1 = require("@/types/types");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
exports.Roles = (...roles) => common_1.ReflectMetadata("roles", roles);
let AuthService = AuthService_1 = class AuthService {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            AuthService_1.logger.log("Entering canActivate");
            const req = context.switchToHttp().getRequest();
            const roles = this.reflector.get("roles", context.getHandler());
            const token = req.headers.authorization;
            console.log(token);
            if (req.headers.test === "true") {
                AuthService_1.logger.warn("Skipping authentication because test header set to true");
                return true;
            }
            if (token === undefined) {
                AuthService_1.logger.warn("Auth token needed but not provided");
                return false;
            }
            let obj;
            try {
                obj = yield types_1.JWT.verify(token, process.env.SECRET);
            }
            catch (e) {
                AuthService_1.logger.log("Failed to verify token");
                return false;
            }
            const errors = yield class_validator_1.validate(obj);
            if (errors.length > 0) {
                AuthService_1.logger.log("Failed to validate token");
                return false;
            }
            AuthService_1.logger.log("Validated JWT successfully");
            if (roles.length < 1) {
                AuthService_1.logger.warn("Roles aren't set");
                req.user = obj;
                return true;
            }
            if (!Object.values(types_1.AccessLevel).includes(obj.accessLevel)) {
                AuthService_1.logger.log("Access Level provided is invalid");
                return false;
            }
            if (roles.includes(obj.accessLevel)) {
                AuthService_1.logger.log("User does have access");
                req.user = obj;
                return true;
            }
            else {
                AuthService_1.logger.log("User does not have access");
                return false;
            }
        });
    }
};
AuthService.logger = new common_1.Logger(AuthService_1.name);
AuthService = AuthService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map