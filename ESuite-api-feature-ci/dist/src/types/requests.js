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
class PatchUserRequest {
    constructor() {
        this.accessLevel = null;
        this.password = null;
    }
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(["Regular", "Admin"]),
    __metadata("design:type", String)
], PatchUserRequest.prototype, "accessLevel", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(8),
    __metadata("design:type", String)
], PatchUserRequest.prototype, "password", void 0);
exports.PatchUserRequest = PatchUserRequest;
class CreateUserRequest {
}
__decorate([
    class_validator_1.IsIn(["Regular", "Admin"]),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "accessLevel", void 0);
__decorate([
    class_validator_1.MinLength(8),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "password", void 0);
__decorate([
    class_validator_1.MinLength(5),
    class_validator_1.NotContains(" "),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "username", void 0);
exports.CreateUserRequest = CreateUserRequest;
class DeleteUserRequest {
}
__decorate([
    class_validator_1.MinLength(5),
    class_validator_1.NotContains(" "),
    __metadata("design:type", String)
], DeleteUserRequest.prototype, "username", void 0);
exports.DeleteUserRequest = DeleteUserRequest;
class CreateTokenRequest {
}
__decorate([
    class_validator_1.MinLength(8),
    class_validator_1.NotContains(" "),
    __metadata("design:type", String)
], CreateTokenRequest.prototype, "password", void 0);
__decorate([
    class_validator_1.MinLength(5),
    class_validator_1.NotContains(" "),
    __metadata("design:type", String)
], CreateTokenRequest.prototype, "username", void 0);
exports.CreateTokenRequest = CreateTokenRequest;
class CreateEquipmentRequest {
    constructor() {
        this.checkedOutTo = null;
        this.notes = null;
        this.id = null;
        this.model = null;
        this.type = null;
        this.status = null;
        this.vendor = null;
    }
}
__decorate([
    class_validator_1.MinLength(1),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "serialNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "checkedOutTo", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "notes", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateEquipmentRequest.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "model", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "vendor", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "jobCode", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "location", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateEquipmentRequest.prototype, "resourceNumber", void 0);
exports.CreateEquipmentRequest = CreateEquipmentRequest;
class BatchCreateEquipmentRequest {
    constructor() {
        this.checkedOutTo = null;
        this.notes = null;
        this.id = null;
        this.model = null;
        this.type = null;
        this.status = null;
        this.vendor = null;
    }
}
__decorate([
    class_validator_1.MinLength(1),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "serialNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "checkedOutTo", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "notes", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], BatchCreateEquipmentRequest.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "model", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "vendor", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "jobCode", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "location", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BatchCreateEquipmentRequest.prototype, "resourceNumber", void 0);
exports.BatchCreateEquipmentRequest = BatchCreateEquipmentRequest;
class PatchEquipmentRequest {
    constructor() {
        this.checkedOutTo = null;
        this.notes = null;
        this.id = null;
        this.model = null;
        this.type = null;
        this.status = null;
        this.vendor = null;
    }
}
__decorate([
    class_validator_1.MinLength(1),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "serialNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "checkedOutTo", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "notes", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], PatchEquipmentRequest.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "model", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "vendor", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "jobCode", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "location", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PatchEquipmentRequest.prototype, "resourceNumber", void 0);
exports.PatchEquipmentRequest = PatchEquipmentRequest;
class SetGuestRequest {
    constructor() {
        this.value = null;
    }
}
__decorate([
    class_validator_1.IsIn(["guest_login", "guest_access"]),
    __metadata("design:type", String)
], SetGuestRequest.prototype, "key", void 0);
exports.SetGuestRequest = SetGuestRequest;
class GetGuestRequest {
}
exports.GetGuestRequest = GetGuestRequest;
class AutoBackupRequest {
}
exports.AutoBackupRequest = AutoBackupRequest;
//# sourceMappingURL=requests.js.map