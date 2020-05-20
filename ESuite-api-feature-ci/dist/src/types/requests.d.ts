export declare class PatchUserRequest {
    accessLevel: string;
    password: string;
}
export declare class CreateUserRequest {
    accessLevel: string;
    password: string;
    username: string;
}
export declare class DeleteUserRequest {
    username: string;
}
export declare class CreateTokenRequest {
    password: string;
    username: string;
}
export declare class CreateEquipmentRequest {
    serialNumber: string;
    checkedOutTo: string;
    notes: string;
    id: number;
    model: string;
    type: string;
    status: string;
    vendor: string;
    phoneNumber?: string;
    jobCode?: string;
    location?: string;
    resourceNumber?: string;
}
export declare class BatchCreateEquipmentRequest {
    serialNumber: string;
    start: number;
    end: number;
    checkedOutTo: string;
    notes: string;
    id: number;
    model: string;
    type: string;
    status: string;
    vendor: string;
    phoneNumber?: string;
    jobCode?: string;
    location?: string;
    resourceNumber?: string;
}
export declare class PatchEquipmentRequest {
    serialNumber: string;
    checkedOutTo: string;
    notes: string;
    id: number;
    model: string;
    type: string;
    status: string;
    vendor: string;
    phoneNumber?: string;
    jobCode?: string;
    location?: string;
    resourceNumber?: string;
}
export declare class SetGuestRequest {
    key: string;
    value: string;
}
export declare class GetGuestRequest {
    key: string;
}
export declare class AutoBackupRequest {
    path: string;
    interval: string;
}
