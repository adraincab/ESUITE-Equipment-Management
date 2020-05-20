"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Seed1553360039675 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into("config")
                .values([
                { key: "guest_login", value: "Disabled" },
                { key: "guest_access", value: "Regular" },
                { key: "equip_verified", value: "Never" },
                { key: "auto_backup", value: "Never" },
                { key: "auto_backup_path", value: "None" },
            ])
                .execute();
            yield queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into("user")
                .values({
                username: "admin",
                password: "$2a$10$W65fzzZJP2yovobmA/ew0OQInNIrISRtl9VB/MWOCh0dX44ZXnwEe",
                accessLevel: "Admin",
            })
                .execute();
            if (process.env.NODE_ENV === "test") {
                yield queryRunner.manager
                    .createQueryBuilder()
                    .insert()
                    .into("user")
                    .values({
                    username: "reguser",
                    password: "$2a$10$W65fzzZJP2yovobmA/ew0OQInNIrISRtl9VB/MWOCh0dX44ZXnwEe",
                    accessLevel: "Regular",
                })
                    .execute();
            }
        });
    }
    down(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.Seed1553360039675 = Seed1553360039675;
//# sourceMappingURL=1553360039675-Seed.js.map