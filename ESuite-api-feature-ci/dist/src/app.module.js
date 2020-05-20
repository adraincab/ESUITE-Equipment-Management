"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("@/auth/auth.controller");
const auth_service_1 = require("@/auth/auth.service");
const database_controller_1 = require("@/database/database.controller");
const equipment_1 = require("@/entity/equipment");
const user_1 = require("@/entity/user");
const equipment_controller_1 = require("@/equipment/equipment.controller");
const user_controller_1 = require("@/user/user.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const _1553360039675_Seed_1 = require("../migrations/1553360039675-Seed");
const config_controller_1 = require("./config/config.controller");
const config_1 = require("./entity/config");
const equipment_service_1 = require("./equipment/equipment.service");
const report_controller_1 = require("./reports/report.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "sqlite",
                database: process.env.NODE_ENV === "test" ? ":memory:" : "EsuiteDev.db",
                synchronize: true,
                keepConnectionAlive: true,
                logging: process.env.NODE_ENV !== "test",
                entities: [user_1.User, equipment_1.Equipment, config_1.Config],
                migrationsRun: true,
                migrations: [_1553360039675_Seed_1.Seed1553360039675],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_1.User, equipment_1.Equipment, config_1.Config]),
        ],
        controllers: [
            database_controller_1.DatabaseController,
            user_controller_1.UserController,
            equipment_controller_1.EquipmentController,
            auth_controller_1.AuthController,
            config_controller_1.ConfigController,
            report_controller_1.ReportController,
        ],
        providers: [auth_service_1.AuthService, equipment_service_1.EquipmentService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map