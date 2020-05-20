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
var DatabaseController_1;
const auth_service_1 = require("@/auth/auth.service");
const common_1 = require("@nestjs/common");
const fs = require("fs");
let DatabaseController = DatabaseController_1 = class DatabaseController {
    constructor() {
        this.logger = new common_1.Logger(DatabaseController_1.name);
    }
    getDatabase(res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Getting database file");
            return res.download("./EsuiteDev.db", "Database.db", () => {
                return;
            });
        });
    }
    restoreDatabase(database, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (database === undefined || database === null) {
                this.logger.log("Database file is null or undefined");
                return res.status(common_1.HttpStatus.BAD_REQUEST).send();
            }
            this.logger.log("Saving database to disk");
            fs.writeFile("EsuiteDev.db", database.buffer, () => {
                return;
            });
            this.logger.log("Saved database to disk successfully");
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
};
__decorate([
    common_1.Get(),
    auth_service_1.Roles("Admin"),
    common_1.UseGuards(auth_service_1.AuthService),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "getDatabase", null);
__decorate([
    common_1.Post(),
    auth_service_1.Roles("Admin"),
    common_1.UseGuards(auth_service_1.AuthService),
    common_1.UseInterceptors(common_1.FileInterceptor("database")),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "restoreDatabase", null);
DatabaseController = DatabaseController_1 = __decorate([
    common_1.Injectable(),
    common_1.Controller("database")
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map