import { User } from "@/types/User";

export class RootState extends Object {
  user?: User;
  token?: string;
}
