import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
export declare const Roles: (...roles: string[]) => (target: object, key?: any, descriptor?: any) => any;
export declare class AuthService implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    private static readonly logger;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
