export declare enum AccessLevel {
    Regular = "Regular",
    Admin = "Admin"
}
export declare class User {
    username: string;
    accessLevel: AccessLevel;
}
export declare class JWT {
    static verify: any;
    username: string;
    accessLevel: string;
}
