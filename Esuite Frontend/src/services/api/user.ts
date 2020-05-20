import axios from "axios";
import * as HttpStatus from "http-status-codes";

export async function getMe() {
  const res = await axios.get("/user/me");

  if (res === undefined || res.status !== HttpStatus.OK) {
    return null;
  }

  return res.data;
}
