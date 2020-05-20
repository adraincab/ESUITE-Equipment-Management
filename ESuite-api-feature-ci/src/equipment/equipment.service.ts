import { Equipment } from "@/entity/equipment";
import { BatchCreateEquipmentRequest } from "@/types/requests";
import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { Repository, Transaction, TransactionRepository } from "typeorm";

@Injectable()
export class EquipmentService {
  private readonly logger = new Logger(EquipmentService.name);

  @Transaction()
  async batchCreateEquipment(
    req: BatchCreateEquipmentRequest,
    @TransactionRepository(Equipment)
    equipmentRepository?: Repository<Equipment>,
  ) {
    this.logger.log("Attempting to batch add equipment");
    for (let i = req.start; i <= req.end; i++) {
      const equipment = new Equipment();
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

      await equipmentRepository.save(equipment);
    }

    this.logger.log("Successfully batch added equipment");
    return equipmentRepository;
  }
}
