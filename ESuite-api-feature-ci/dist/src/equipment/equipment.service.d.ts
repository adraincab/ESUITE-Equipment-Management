import { Equipment } from "@/entity/equipment";
import { BatchCreateEquipmentRequest } from "@/types/requests";
import { Repository } from "typeorm";
export declare class EquipmentService {
    private readonly logger;
    batchCreateEquipment(req: BatchCreateEquipmentRequest, equipmentRepository?: Repository<Equipment>): Promise<Repository<Equipment>>;
}
