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
var EquipmentController_1;
const auth_service_1 = require("@/auth/auth.service");
const equipment_1 = require("@/entity/equipment");
const equipment_service_1 = require("@/equipment/equipment.service");
const validation_pipe_1 = require("@/pipes/validation.pipe");
const requests_1 = require("@/types/requests");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EquipmentController = EquipmentController_1 = class EquipmentController {
    constructor(equipmentRepository, equipmentService) {
        this.equipmentRepository = equipmentRepository;
        this.equipmentService = equipmentService;
        this.logger = new common_1.Logger(EquipmentController_1.name);
    }
    createEquipment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to create equipment");
            const equipment = new equipment_1.Equipment();
            equipment.serialNumber = req.serialNumber;
            equipment.checkedOutTo = req.checkedOutTo;
            equipment.notes = req.notes;
            equipment.model = req.model;
            equipment.type = req.type;
            equipment.status = req.status;
            equipment.vendor = req.vendor;
            equipment.phoneNumber = req.phoneNumber;
            equipment.jobCode = req.jobCode;
            equipment.location = req.location;
            equipment.resourceNumber = req.resourceNumber;
            try {
                yield this.equipmentRepository.save(equipment);
                return res.status(common_1.HttpStatus.CREATED).send();
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).send();
            }
        });
    }
    getAllEquipment() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Getting all equipment");
            return yield this.equipmentRepository.find();
        });
    }
    deleteEquipment(serial, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to delete equipment");
            this.logger.log(serial);
            const equipment = new equipment_1.Equipment();
            equipment.serialNumber = serial;
            try {
                yield this.equipmentRepository.remove(equipment);
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            this.logger.log("Successfully deleted equipment ", serial);
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
    updateEquipment(serial, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to update equipment");
            this.logger.log(serial);
            const equipment = new equipment_1.Equipment();
            equipment.serialNumber = req.serialNumber;
            equipment.checkedOutTo = req.checkedOutTo;
            equipment.notes = req.notes;
            equipment.model = req.model;
            equipment.type = req.type;
            equipment.status = req.status;
            equipment.vendor = req.vendor;
            equipment.phoneNumber = req.phoneNumber;
            equipment.jobCode = req.jobCode;
            equipment.location = req.location;
            equipment.resourceNumber = req.resourceNumber;
            try {
                yield this.equipmentRepository.save(equipment);
            }
            catch (_a) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send();
            }
            this.logger.log("Successfully updated equipment ", serial);
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        });
    }
    batchCreateEquipment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to batch create equipment");
            try {
                this.equipmentService.batchCreateEquipment(req);
            }
            catch (_a) {
                this.logger.log("Failed to batch create equipment");
                return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).send();
            }
            this.logger.log("Successfully batch created equipment");
            return res.status(common_1.HttpStatus.CREATED).send();
        });
    }
};
__decorate([
    common_1.Post(),
    auth_service_1.Roles(),
    common_1.UseGuards(auth_service_1.AuthService),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.CreateEquipmentRequest, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "createEquipment", null);
__decorate([
    common_1.Get(),
    auth_service_1.Roles(),
    common_1.UseGuards(auth_service_1.AuthService),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "getAllEquipment", null);
__decorate([
    common_1.Delete(":serial"),
    auth_service_1.Roles(),
    common_1.UseGuards(auth_service_1.AuthService),
    __param(0, common_1.Param("serial")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "deleteEquipment", null);
__decorate([
    common_1.Patch(":serial"),
    auth_service_1.Roles(),
    common_1.UseGuards(auth_service_1.AuthService),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param("serial")),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, requests_1.PatchEquipmentRequest, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "updateEquipment", null);
__decorate([
    common_1.Post("batch"),
    auth_service_1.Roles(),
    common_1.UseGuards(auth_service_1.AuthService),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.BatchCreateEquipmentRequest, Object]),
    __metadata("design:returntype", Promise)
], EquipmentController.prototype, "batchCreateEquipment", null);
EquipmentController = EquipmentController_1 = __decorate([
    common_1.Injectable(),
    common_1.Controller("equipment"),
    __param(0, typeorm_1.InjectRepository(equipment_1.Equipment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        equipment_service_1.EquipmentService])
], EquipmentController);
exports.EquipmentController = EquipmentController;
//# sourceMappingURL=equipment.controller.js.map