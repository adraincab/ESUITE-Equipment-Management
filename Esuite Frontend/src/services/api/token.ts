import axios from "axios";
import { LoginUserRequest } from "@/types/User";
import * as HttpStatus from "http-status-codes";

export async function create(user: LoginUserRequest) {
  const res = await axios.post("/token", user);

  if (res === undefined || res.status !== HttpStatus.OK) {
    return null;
  }

  return res.data;
}

export async function createGuest() {
  const res = await axios.post("/token/guest");

  if (res === undefined || res.status !== HttpStatus.OK) {
    return null;
  }

  return res.data;
}
