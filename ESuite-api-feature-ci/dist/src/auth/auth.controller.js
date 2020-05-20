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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var AuthController_1;
const config_1 = require("@/entity/config");
const user_1 = require("@/entity/user");
const bcrypt_1 = require("@/helpers/bcrypt");
const validation_pipe_1 = require("@/pipes/validation.pipe");
const requests_1 = require("@/types/requests");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_2 = require("typeorm");
let AuthController = AuthController_1 = class AuthController {
    constructor(userRepository, configRepository) {
        this.userRepository = userRepository;
        this.configRepository = configRepository;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    createToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to create token for user " + req.username);
            let user = null;
            try {
                user = yield this.userRepository
                    .createQueryBuilder("row")
                    .select("row.username")
                    .addSelect("row.password")
                    .addSelect("row.accessLevel")
                    .where("row.username = :username", { username: req.username })
                    .getOne();
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).send();
            }
            if (user === undefined) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).send();
            }
            if (!(yield bcrypt_1.Bcrypt.compare(req.password, user.password))) {
                this.logger.log("Failed to validate user " + req.username);
                return res.status(common_1.HttpStatus.UNAUTHORIZED).send();
            }
            const expireDate = new Date();
            expireDate.setTime(new Date().getTime() + 60 * 60 * 24 * 14);
            const token = jsonwebtoken_1.sign({
                username: user.username,
                accessLevel: user.accessLevel,
                expiresAt: expireDate,
            }, "24dc1870-4e73-4e05-bfb5-726cc22f10b3");
            return res.status(common_1.HttpStatus.OK).send(token);
        });
    }
    createGuestToken(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const guestUsername = "guest" + Date.now();
            const guestAllowed = yield this.configRepository.findOne({
                key: "guest_login",
            });
            const guestAccess = yield this.configRepository.findOne({
                key: "guest_access",
            });
            if (guestAllowed.value === "false") {
                this.logger.log("Guest Login not Allowed");
                return res.status(common_1.HttpStatus.UNAUTHORIZED).send();
            }
            const expireDate = new Date();
            expireDate.setTime(new Date().getTime() + 60 * 60 * 24 * 14);
            const user = {
                username: guestUsername,
                accessLevel: guestAccess.value,
            };
            const token = jsonwebtoken_1.sign({
                username: guestUsername,
                accessLevel: guestAccess.value,
                expiresAt: expireDate,
            }, "24dc1870-4e73-4e05-bfb5-726cc22f10b3");
            res.status(common_1.HttpStatus.OK).send({ user, accessToken: token });
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.CreateTokenRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createToken", null);
__decorate([
    common_1.Post("/guest"),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createGuestToken", null);
AuthController = AuthController_1 = __decorate([
    common_1.Injectable(),
    common_1.Controller("token"),
    __param(0, typeorm_1.InjectRepository(user_1.User)),
    __param(1, typeorm_1.InjectRepository(config_1.Config)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map