import { Config } from "@/entity/config";
import { User } from "@/entity/user";
import { CreateTokenRequest } from "@/types/requests";
import { Repository } from "typeorm";
export declare class AuthController {
    private readonly userRepository;
    private readonly configRepository;
    constructor(userRepository: Repository<User>, configRepository: Repository<Config>);
    private readonly logger;
    createToken(req: CreateTokenRequest, res: any): Promise<any>;
    createGuestToken(res: any): Promise<any>;
}
