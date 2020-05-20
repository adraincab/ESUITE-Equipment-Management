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
var ConfigController_1;
const auth_service_1 = require("@/auth/auth.service");
const config_1 = require("@/entity/config");
const validation_pipe_1 = require("@/pipes/validation.pipe");
const requests_1 = require("@/types/requests");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ConfigController = ConfigController_1 = class ConfigController {
    constructor(configRepository) {
        this.configRepository = configRepository;
        this.logger = new common_1.Logger(ConfigController_1.name);
    }
    getConfigValue(key, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to get key");
            try {
                const value = yield this.configRepository.findOne({ key });
                if (value === undefined) {
                    return res.status(common_1.HttpStatus.NOT_FOUND).send();
                }
                this.logger.log("Got key");
                return res.send(value);
            }
            catch (_a) {
                this.logger.log("Failed to get key");
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
        });
    }
    toggleGuestLogin(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let row;
            try {
                row = yield this.configRepository.findOne({ key: "guest_login" });
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            if (row === undefined) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            if (row.value === "Enabled") {
                row.value = "Disabled";
            }
            else {
                row.value = "Enabled";
            }
            yield this.configRepository.save(row);
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
    setEquipVerified(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let row;
            try {
                row = yield this.configRepository.findOne({ key: "equip_verified" });
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            if (row === undefined) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            row.value = new Date().toString();
            yield this.configRepository.save(row);
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
    toggleGuestAccess(res) {
        return __awaiter(this, void 0, void 0, function* () {
            let row;
            try {
                row = yield this.configRepository.findOne({ key: "guest_access" });
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            if (row === undefined) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            if (row.value === "Regular") {
                row.value = "Admin";
            }
            else {
                row.value = "Regular";
            }
            yield this.configRepository.save(row);
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
    setAutoBackup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let intervalRow;
            let pathRow;
            try {
                intervalRow = yield this.configRepository.findOne({ key: "auto_backup" });
                pathRow = yield this.configRepository.findOne({
                    key: "auto_backup_path",
                });
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            if (intervalRow === undefined) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            if (pathRow === undefined) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            intervalRow.value = req.interval;
            pathRow.value = req.path;
            yield this.configRepository.save(intervalRow);
            yield this.configRepository.save(pathRow);
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
};
__decorate([
    common_1.Get(":key"),
    __param(0, common_1.Param("key")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "getConfigValue", null);
__decorate([
    common_1.Patch("guest_login"),
    common_1.UseGuards(auth_service_1.AuthService),
    auth_service_1.Roles("Admin"),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "toggleGuestLogin", null);
__decorate([
    common_1.Patch("equip_verified"),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "setEquipVerified", null);
__decorate([
    common_1.Patch("guest_access"),
    common_1.UseGuards(auth_service_1.AuthService),
    auth_service_1.Roles("Admin"),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "toggleGuestAccess", null);
__decorate([
    common_1.Patch("auto_backup"),
    common_1.UseGuards(auth_service_1.AuthService),
    auth_service_1.Roles("Admin"),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.AutoBackupRequest, Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "setAutoBackup", null);
ConfigController = ConfigController_1 = __decorate([
    common_1.Injectable(),
    common_1.Controller("config"),
    __param(0, typeorm_1.InjectRepository(config_1.Config)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConfigController);
exports.ConfigController = ConfigController;
//# sourceMappingURL=config.controller.js.map