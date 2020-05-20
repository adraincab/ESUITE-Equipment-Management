import { AuthService, Roles } from "@/auth/auth.service";
import { Equipment } from "@/entity/equipment";
import { EquipmentService } from "@/equipment/equipment.service";
import { ValidationPipe } from "@/pipes/validation.pipe";
import {
  BatchCreateEquipmentRequest,
  CreateEquipmentRequest,
  PatchEquipmentRequest,
} from "@/types/requests";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Injectable,
  Logger,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
@Controller("equipment")
export class EquipmentController {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    private readonly equipmentService: EquipmentService,
  ) {}
  private readonly logger = new Logger(EquipmentController.name);

  @Post()
  @Roles()
  @UseGuards(AuthService)
  @UsePipes(new ValidationPipe())
  async createEquipment(@Body() req: CreateEquipmentRequest, @Res() res) {
    this.logger.log("Attempting to create equipment");

    const equipment = new Equipment();
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
      await this.equipmentRepository.save(equipment);
      return res.status(HttpStatus.CREATED).send();
    } catch {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
    }
  }

  @Get()
  @Roles()
  @UseGuards(AuthService)
  async getAllEquipment() {
    this.logger.log("Getting all equipment");
    return await this.equipmentRepository.find();
  }

  @Delete(":serial")
  @Roles()
  @UseGuards(AuthService)
  async deleteEquipment(@Param("serial") serial, @Res() res) {
    this.logger.log("Attempting to delete equipment");
    this.logger.log(serial);

    const equipment = new Equipment();
    equipment.serialNumber = serial;

    try {
      await this.equipmentRepository.remove(equipment);
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    this.logger.log("Successfully deleted equipment ", serial);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Patch(":serial")
  @Roles()
  @UseGuards(AuthService)
  @UsePipes(new ValidationPipe())
  async updateEquipment(
    @Param("serial") serial,
    @Body() req: PatchEquipmentRequest,
    @Res() res,
  ) {
    this.logger.log("Attempting to update equipment");
    this.logger.log(serial);

    const equipment = new Equipment();
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
      await this.equipmentRepository.save(equipment);
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send();
    }

    this.logger.log("Successfully updated equipment ", serial);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post("batch")
  @Roles()
  @UseGuards(AuthService)
  @UsePipes(new ValidationPipe())
  async batchCreateEquipment(
    @Body() req: BatchCreateEquipmentRequest,
    @Res() res,
  ) {
    this.logger.log("Attempting to batch create equipment");

    try {
      this.equipmentService.batchCreateEquipment(req);
    } catch {
      this.logger.log("Failed to batch create equipment");
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
    }

    this.logger.log("Successfully batch created equipment");
    return res.status(HttpStatus.CREATED).send();
  }
}
