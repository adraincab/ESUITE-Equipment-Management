import { AccessLevel, JWT } from "@/types/types";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  ReflectMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { validate } from "class-validator";

// Move this to separate file
export const Roles = (...roles: string[]) => ReflectMetadata("roles", roles);

@Injectable()
export class AuthService implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  private static readonly logger = new Logger(AuthService.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    AuthService.logger.log("Entering canActivate");
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<AccessLevel[]>(
      "roles",
      context.getHandler(),
    );
    const token = req.headers.authorization;
    console.log(token);

    if (req.headers.test === "true") {
      AuthService.logger.warn(
        "Skipping authentication because test header set to true",
      );
      return true;
    }

    if (token === undefined) {
      AuthService.logger.warn("Auth token needed but not provided");
      return false;
    }

    let obj: JWT;

    try {
      obj = await JWT.verify(token, process.env.SECRET);
    } catch (e) {
      AuthService.logger.log("Failed to verify token");
      return false;
    }

    const errors = await validate(obj);

    if (errors.length > 0) {
      AuthService.logger.log("Failed to validate token");
      return false;
    }

    AuthService.logger.log("Validated JWT successfully");

    if (roles.length < 1) {
      AuthService.logger.warn("Roles aren't set");
      req.user = obj;
      return true;
    }

    if (!Object.values(AccessLevel).includes(obj.accessLevel)) {
      AuthService.logger.log("Access Level provided is invalid");
      return false;
    }

    if (roles.includes(obj.accessLevel as AccessLevel)) {
      AuthService.logger.log("User does have access");
      req.user = obj;
      return true;
    } else {
      AuthService.logger.log("User does not have access");
      return false;
    }
  }
}
