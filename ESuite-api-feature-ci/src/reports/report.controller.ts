import { AuthService, Roles } from "@/auth/auth.service";
import { Equipment } from "@/entity/equipment";
import {
  Controller,
  Get,
  Injectable,
  Logger,
  Param,
  Res,
  UseGuards,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { parse } from "json2csv";
import { Repository } from "typeorm";

@Injectable()
@Controller("report")
export class ReportController {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}
  private readonly logger = new Logger(ReportController.name);

  @Get(":type")
  @Roles("Admin", "Regular")
  @UseGuards(AuthService)
  async getReport(@Param("type") type, @Res() res) {
    this.logger.log("Getting equipment report");

    let report;
    let opts;

    if (type === "all") {
      report = await this.equipmentRepository.find();
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
    } else if (type === "checkedIn") {
      report = await this.equipmentRepository
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
    } else if (type === "checkedOut") {
      report = await this.equipmentRepository
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

    const csv = parse(report, opts);

    return res.send(csv);
  }

  @Get("/preview/:type")
  @Roles("Admin", "Regular")
  @UseGuards(AuthService)
  async getPreview(@Param("type") type, @Res() res) {
    this.logger.log("Getting equipment report");

    let report;

    if (type === "all") {
      report = await this.equipmentRepository.find();
    } else if (type === "checkedIn") {
      report = await this.equipmentRepository
        .createQueryBuilder("equip")
        .select("serialNumber")
        .addSelect("type")
        .addSelect("model")
        .addSelect("status")
        .addSelect("location")
        .where("equip.status = :status", { status: "Checked In" })
        .execute();
    } else if (type === "checkedOut") {
      report = await this.equipmentRepository
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
  }
}
