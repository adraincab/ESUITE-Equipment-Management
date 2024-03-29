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
var EquipmentService_1;
const equipment_1 = require("@/entity/equipment");
const requests_1 = require("@/types/requests");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let EquipmentService = EquipmentService_1 = class EquipmentService {
    constructor() {
        this.logger = new common_2.Logger(EquipmentService_1.name);
    }
    batchCreateEquipment(req, equipmentRepository) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("Attempting to batch add equipment");
            for (let i = req.start; i <= req.end; i++) {
                const equipment = new equipment_1.Equipment();
                equipment.serialNumber = req.serialNumber + i.toString();
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
                yield equipmentRepository.save(equipment);
            }
            this.logger.log("Successfully batch added equipment");
            return equipmentRepository;
        });
    }
};
__decorate([
    typeorm_1.Transaction(),
    __param(1, typeorm_1.TransactionRepository(equipment_1.Equipment)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [requests_1.BatchCreateEquipmentRequest,
        typeorm_1.Repository]),
    __metadata("design:returntype", Promise)
], EquipmentService.prototype, "batchCreateEquipment", null);
EquipmentService = EquipmentService_1 = __decorate([
    common_1.Injectable()
], EquipmentService);
exports.EquipmentService = EquipmentService;
//# sourceMappingURL=equipment.service.js.map