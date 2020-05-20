import { Equipment } from "@/entity/equipment";
import { EquipmentService } from "@/equipment/equipment.service";
import { BatchCreateEquipmentRequest, CreateEquipmentRequest, PatchEquipmentRequest } from "@/types/requests";
import { Repository } from "typeorm";
export declare class EquipmentController {
    private readonly equipmentRepository;
    private readonly equipmentService;
    constructor(equipmentRepository: Repository<Equipment>, equipmentService: EquipmentService);
    private readonly logger;
    createEquipment(req: CreateEquipmentRequest, res: any): Promise<any>;
    getAllEquipment(): Promise<Equipment[]>;
    deleteEquipment(serial: any, res: any): Promise<any>;
    updateEquipment(serial: any, req: PatchEquipmentRequest, res: any): Promise<any>;
    batchCreateEquipment(req: BatchCreateEquipmentRequest, res: any): Promise<any>;
}
