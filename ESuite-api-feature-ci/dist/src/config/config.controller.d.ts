import { Config } from "@/entity/config";
import { AutoBackupRequest } from "@/types/requests";
import { Repository } from "typeorm";
export declare class ConfigController {
    private readonly configRepository;
    constructor(configRepository: Repository<Config>);
    private readonly logger;
    getConfigValue(key: any, res: any): Promise<any>;
    toggleGuestLogin(res: any): Promise<any>;
    setEquipVerified(res: any): Promise<any>;
    toggleGuestAccess(res: any): Promise<any>;
    setAutoBackup(req: AutoBackupRequest, res: any): Promise<any>;
}
