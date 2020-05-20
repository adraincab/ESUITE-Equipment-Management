import { User } from "@/entity/user";
import { CreateUserRequest, PatchUserRequest } from "@/types/requests";
import { Repository } from "typeorm";
export declare class UserController {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    private readonly logger;
    createUser(req: CreateUserRequest, res: any): Promise<any>;
    deleteUser(username: any, res: any): Promise<any>;
    getAllUsers(): Promise<User[]>;
    getUserMe(req: any, res: any): Promise<any>;
    getUser(username: any, res: any): Promise<any>;
    updateUser(username: any, req: any, body: PatchUserRequest, res: any): Promise<any>;
}
