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
var UserController_1;
const auth_service_1 = require("@/auth/auth.service");
const user_1 = require("@/entity/user");
const bcrypt_1 = require("@/helpers/bcrypt");
const validation_pipe_1 = require("@/pipes/validation.pipe");
const requests_1 = require("@/types/requests");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserController = UserController_1 = class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to create user");
            const password = yield bcrypt_1.Bcrypt.hash(req.password, bcrypt_1.Bcrypt.SALT_ROUNDS);
            const user = new user_1.User();
            user.username = req.username;
            if ((yield this.userRepository.findOne(user)) !== undefined) {
                this.logger.error("User already exists");
                return res.status(common_1.HttpStatus.CONFLICT).send();
            }
            user.password = password;
            user.accessLevel = req.accessLevel;
            try {
                yield this.userRepository.save(user);
            }
            catch (_a) {
                return;
            }
            this.logger.log("Created user " + req.username + " successfully");
            return res.status(common_1.HttpStatus.CREATED).send();
        });
    }
    deleteUser(username, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to delete user");
            this.logger.log(username);
            const user = new user_1.User();
            user.username = username;
            try {
                yield this.userRepository.remove(user);
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            this.logger.log("Successfully deleted user ", username);
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Getting all users");
            return yield this.userRepository.find();
        });
    }
    getUserMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to get currently logged in user");
            const user = new user_1.User();
            user.username = req.user.username;
            user.accessLevel = req.user.accessLevel;
            let me;
            try {
                me = yield this.userRepository.findOne(user);
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            this.logger.log("Successfully got current user " + me.username);
            return res.send(me);
        });
    }
    getUser(username, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to get user from params");
            const userRequest = new user_1.User();
            userRequest.username = username;
            let user;
            try {
                user = yield this.userRepository.findOne(user);
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            this.logger.log("Successfully got current user " + user);
            res.send(user);
        });
    }
    updateUser(username, req, body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to update user" + username + " by " + req.user.username);
            if (body.password === null && req.accessLevel === null) {
                this.logger.log("Nothing to do");
                return res.status(common_1.HttpStatus.NO_CONTENT).send();
            }
            if (username === req.user.username) {
                this.logger.error("User can't update their own info");
                return res.status(common_1.HttpStatus.BAD_REQUEST).send();
            }
            const user = yield this.userRepository.findOne({ username });
            if (body.password !== null) {
                user.password = yield bcrypt_1.Bcrypt.hash(body.password, bcrypt_1.Bcrypt.SALT_ROUNDS);
            }
            if (body.accessLevel !== null) {
                user.accessLevel = body.accessLevel;
            }
            yield this.userRepository.save(user);
            this.logger.log("Successfully updated user ", username);
            res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(auth_service_1.AuthService),
    auth_service_1.Roles("Admin"),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.CreateUserRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Delete(":username"),
    auth_service_1.Roles("Admin"),
    common_1.UseGuards(auth_service_1.AuthService),
    __param(0, common_1.Param("username")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.Get(),
    auth_service_1.Roles(),
    common_1.UseGuards(auth_service_1.AuthService),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    common_1.Get("me"),
    auth_service_1.Roles(),
    common_1.UseGuards(auth_service_1.AuthService),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserMe", null);
__decorate([
    common_1.Get(":username"),
    auth_service_1.Roles("Admin"),
    common_1.UseGuards(auth_service_1.AuthService),
    __param(0, common_1.Param("username")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Patch(":username"),
    auth_service_1.Roles("Admin"),
    common_1.UseGuards(auth_service_1.AuthService),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param("username")),
    __param(1, common_1.Req()),
    __param(2, common_1.Body()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, requests_1.PatchUserRequest, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
UserController = UserController_1 = __decorate([
    common_1.Injectable(),
    common_1.Controller("user"),
    __param(0, typeorm_1.InjectRepository(user_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map