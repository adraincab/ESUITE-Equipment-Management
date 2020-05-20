import { BaseEntity } from "typeorm";
export declare class Equipment extends BaseEntity {
    serialNumber: string;
    checkedOutTo?: string;
    notes?: string;
    model?: string;
    type?: string;
    status?: string;
    vendor?: string;
    phoneNumber?: string;
    jobCode?: string;
    location?: string;
    resourceNumber?: string;
}
