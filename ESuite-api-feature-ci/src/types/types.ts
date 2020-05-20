import { IsIn, IsString, Length } from "class-validator";
import { verify } from "jsonwebtoken";
import { promisify } from "util";

export enum AccessLevel {
  Regular = "Regular",
  Admin = "Admin",
}

export class User {
  public username: string;
  public accessLevel: AccessLevel;
}

export class JWT {
  public static verify = promisify(verify).bind(JWT.verify);

  @IsString()
  @Length(1, 50)
  public username: string;

  @IsIn(["Regular", "Admin"])
  public accessLevel: string;
}
