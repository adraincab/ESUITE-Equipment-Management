import { UserType } from "@/types/UserType.ts";

export class User extends Object {
  username: string = "";
  accessLevel: UserType = UserType.Regular;
}

export class LoginUserRequest extends Object {
  username: string = "";
  password: string = "";
}

export class CreateUserRequest extends Object {
  username: string = "";
  password: string = "";
  accessLevel: string = "";
}

export class UpdateUserRequest extends Object {
  username: string = "";
  password?: string;
  accessLevel?: string;
}
