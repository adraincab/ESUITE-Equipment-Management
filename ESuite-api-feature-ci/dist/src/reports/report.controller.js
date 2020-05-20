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
var ReportController_1;
const auth_service_1 = require("@/auth/auth.service");
const equipment_1 = require("@/entity/equipment");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const json2csv_1 = require("json2csv");
const typeorm_2 = require("typeorm");
let ReportController = ReportController_1 = class ReportController {
    constructor(equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
        this.logger = new common_1.Logger(ReportController_1.name);
    }
    getReport(type, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Getting equipment report");
            let report;
            let opts;
            if (type === "all") {
                report = yield this.equipmentRepository.find();
                opts = {
                    fields: [
                        "serialNumber",
                        "checkedOutTo",
                        "notes",
                        "model",
                        "type",
                        "status",
                        "vendor",
                        "phoneNumber",
                        "jobCode",
                        "location",
                        "resourceNumber",
                    ],
                };
            }
            else if (type === "checkedIn") {
                report = yield this.equipmentRepository
                    .createQueryBuilder("equip")
                    .select("serialNumber")
                    .addSelect("type")
                    .addSelect("model")
                    .addSelect("status")
                    .addSelect("location")
                    .addSelect("checkedOutTo")
                    .where("equip.status = :status", { status: "Checked In" })
                    .execute();
                opts = {
                    fields: [
                        "serialNumber",
                        "checkedOutTo",
                        "notes",
                        "model",
                        "type",
                        "status",
                        "vendor",
                        "phoneNumber",
                        "jobCode",
                        "location",
                        "resourceNumber",
                    ],
                };
            }
            else if (type === "checkedOut") {
                report = yield this.equipmentRepository
                    .createQueryBuilder("equip")
                    .select("serialNumber")
                    .addSelect("type")
                    .addSelect("model")
                    .addSelect("status")
                    .addSelect("location")
                    .addSelect("checkedOutTo")
                    .where("equip.status = :status", { status: "Checked Out" })
                    .execute();
                opts = {
                    fields: [
                        "serialNumber",
                        "type",
                        "model",
                        "status",
                        "location",
                        "checkedOutTo",
                    ],
                };
            }
            const csv = json2csv_1.parse(report, opts);
            return res.send(csv);
        });
    }
    getPreview(type, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Getting equipment report");
            let report;
            if (type === "all") {
                report = yield this.equipmentRepository.find();
            }
            else if (type === "checkedIn") {
                report = yield this.equipmentRepository
                    .createQueryBuilder("equip")
                    .select("serialNumber")
                    .addSelect("type")
                    .addSelect("model")
                    .addSelect("status")
                    .addSelect("location")
                    .where("equip.status = :status", { status: "Checked In" })
                    .execute();
            }
            else if (type === "checkedOut") {
                report = yield this.equipmentRepository
                    .createQueryBuilder("equip")
                    .select("serialNumber")
                    .addSelect("type")
                    .addSelect("model")
                    .addSelect("status")
                    .addSelect("location")
                    .addSelect("checkedOutTo")
                    .where("equip.status = :status", { status: "Checked Out" })
                    .execute();
            }
            return res.send(report);
        });
    }
};
__decorate([
    common_1.Get(":type"),
    auth_service_1.Roles("Admin", "Regular"),
    common_1.UseGuards(auth_service_1.AuthService),
    __param(0, common_1.Param("type")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReport", null);
__decorate([
    common_1.Get("/preview/:type"),
    auth_service_1.Roles("Admin", "Regular"),
    common_1.UseGuards(auth_service_1.AuthService),
    __param(0, common_1.Param("type")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getPreview", null);
ReportController = ReportController_1 = __decorate([
    common_1.Injectable(),
    common_1.Controller("report"),
    __param(0, typeorm_1.InjectRepository(equipment_1.Equipment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map