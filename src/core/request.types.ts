import { User } from "./user.store";
import { Request } from "express";
export default interface IAuthRequest extends Request {
  user: {
    id: User["id"];
    email: User["email"];
  };
}
