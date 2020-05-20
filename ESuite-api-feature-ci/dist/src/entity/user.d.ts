import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    username: string;
    password: string;
    accessLevel: string;
}
