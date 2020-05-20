import { Equipment } from "@/entity/equipment";
import { Repository } from "typeorm";
export declare class ReportController {
    private readonly equipmentRepository;
    constructor(equipmentRepository: Repository<Equipment>);
    private readonly logger;
    getReport(type: any, res: any): Promise<any>;
    getPreview(type: any, res: any): Promise<any>;
}
