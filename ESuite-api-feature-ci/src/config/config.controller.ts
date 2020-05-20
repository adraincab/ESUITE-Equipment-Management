import { AuthService, Roles } from "@/auth/auth.service";
import { Config } from "@/entity/config";
import { ValidationPipe } from "@/pipes/validation.pipe";
import { AutoBackupRequest } from "@/types/requests";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Injectable,
  Logger,
  Param,
  Patch,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
@Controller("config")
export class ConfigController {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  private readonly logger = new Logger(ConfigController.name);

  @Get(":key")
  async getConfigValue(@Param("key") key, @Res() res) {
    this.logger.log("Attempting to get key");
    try {
      const value = await this.configRepository.findOne({ key });

      if (value === undefined) {
        return res.status(HttpStatus.NOT_FOUND).send();
      }

      this.logger.log("Got key");
      return res.send(value);
    } catch {
      this.logger.log("Failed to get key");
      return res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Patch("guest_login")
  @UseGuards(AuthService)
  @Roles("Admin")
  @UsePipes(new ValidationPipe())
  async toggleGuestLogin(@Res() res) {
    let row;
    try {
      row = await this.configRepository.findOne({ key: "guest_login" });
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    if (row === undefined) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    if (row.value === "Enabled") {
      row.value = "Disabled";
    } else {
      row.value = "Enabled";
    }

    await this.configRepository.save(row);

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Patch("equip_verified")
  @UsePipes(new ValidationPipe())
  async setEquipVerified(@Res() res) {
    let row;
    try {
      row = await this.configRepository.findOne({ key: "equip_verified" });
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    if (row === undefined) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    row.value = new Date().toString();

    await this.configRepository.save(row);

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Patch("guest_access")
  @UseGuards(AuthService)
  @Roles("Admin")
  @UsePipes(new ValidationPipe())
  async toggleGuestAccess(@Res() res) {
    let row;
    try {
      row = await this.configRepository.findOne({ key: "guest_access" });
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    if (row === undefined) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    if (row.value === "Regular") {
      row.value = "Admin";
    } else {
      row.value = "Regular";
    }

    await this.configRepository.save(row);

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Patch("auto_backup")
  @UseGuards(AuthService)
  @Roles("Admin")
  @UsePipes(new ValidationPipe())
  async setAutoBackup(@Body() req: AutoBackupRequest, @Res() res) {
    let intervalRow;
    let pathRow;
    try {
      intervalRow = await this.configRepository.findOne({ key: "auto_backup" });
      pathRow = await this.configRepository.findOne({
        key: "auto_backup_path",
      });
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    if (intervalRow === undefined) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    if (pathRow === undefined) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    intervalRow.value = req.interval;
    pathRow.value = req.path;

    await this.configRepository.save(intervalRow);
    await this.configRepository.save(pathRow);

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
