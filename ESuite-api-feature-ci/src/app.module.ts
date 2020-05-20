import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { DatabaseController } from "@/database/database.controller";
import { Equipment } from "@/entity/equipment";
import { User } from "@/entity/user";
import { EquipmentController } from "@/equipment/equipment.controller";
import { UserController } from "@/user/user.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seed1553360039675 } from "../migrations/1553360039675-Seed";
import { ConfigController } from "./config/config.controller";
import { Config } from "./entity/config";
import { EquipmentService } from "./equipment/equipment.service";
import { ReportController } from "./reports/report.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: process.env.NODE_ENV === "test" ? ":memory:" : "EsuiteDev.db",
      synchronize: true,
      keepConnectionAlive: true,
      logging: process.env.NODE_ENV !== "test",
      entities: [User, Equipment, Config],
      migrationsRun: true,
      migrations: [Seed1553360039675],
    }),
    TypeOrmModule.forFeature([User, Equipment, Config]),
  ],
  controllers: [
    DatabaseController,
    UserController,
    EquipmentController,
    AuthController,
    ConfigController,
    ReportController,
  ],
  providers: [AuthService, EquipmentService],
})
export class AppModule {}
