"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var ValidationPipe_1;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ValidationPipe = ValidationPipe_1 = class ValidationPipe {
    transform(value, { metatype }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!metatype || !this.toValidate(metatype)) {
                ValidationPipe_1.logger.warn("Failed to validate metadata");
                return value;
            }
            const obj = class_transformer_1.plainToClass(metatype, value);
            const errors = yield class_validator_1.validate(obj);
            if (errors.length > 0) {
                ValidationPipe_1.logger.log("Failed to validate request body");
                throw new common_1.BadRequestException("Validation failed");
            }
            ValidationPipe_1.logger.log("Successfully validated request body");
            return obj;
        });
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
};
ValidationPipe.logger = new common_1.Logger(ValidationPipe_1.name);
ValidationPipe = ValidationPipe_1 = __decorate([
    common_1.Injectable()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map