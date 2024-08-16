import jwt from "jsonwebtoken";
import { CookieOptions } from "express";
import { JWT_EXPIRY, JWT_SECRET } from "../config/env.config";
export const generateJWTToken = async (payload: any) => {
  const token = await jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRY, // "30d", // TODO later implement refresh token and decrease this
  });

  return token;
};

export const verifyJWTToken = async (token: string) => {
  return await jwt.verify(token, JWT_SECRET as string);
};

export const decodeJWTToken = async (token: string) => {
  return await jwt.decode(token);
};

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 24 * 30, // TODO make it dynamic when changed in jwt
} as CookieOptions;
