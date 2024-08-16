import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../db/schema/user.schema";

export interface CustomRequest extends Request {
  user?: Omit<User, "password">;
}

export interface CustomPayload extends JwtPayload {
  id?: string;
  email?: string;
}
