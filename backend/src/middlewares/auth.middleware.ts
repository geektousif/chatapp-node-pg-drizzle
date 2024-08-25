import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { CustomPayload } from "../types/authHelper.type";
import { NotFoundError, UnauthorizedError } from "../utils/errors";
import { verifyJWTToken } from "../utils/helpers";
import { getUserById } from "../repositories/user.repository";
import cookieParser from "cookie-parser";
import { SocketWithUser } from "../types/socketWithUser";

const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      (req.header("Authorization") &&
        req.header("Authorization")?.startsWith("Bearer")) ||
      req.cookies.token
    ) {
      token =
        req.header("Authorization") &&
        req.header("Authorization")?.startsWith("Bearer")
          ? req.header("Authorization")?.split(" ")[1]
          : req.cookies.token;
    }

    if (!token) {
      throw new UnauthorizedError("Unauthorized. No token provided");
    }

    let decoded: CustomPayload;
    try {
      decoded = (await verifyJWTToken(token)) as CustomPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError("Token Expired");
      }
      throw new UnauthorizedError("Invalid Access Token");
    }

    // if (decoded.exp && decoded.exp < Date.now() / 1000) {
    //   throw new UnauthorizedError("Access Token Expired", 401);
    // }
    console.log(decoded);
    const { password, ...user } = await getUserById(decoded.id!);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    req.user = user;

    next();
  } catch (error: any) {
    next(error);
  }
});

export default authMiddleware;

export const socketAuth = async (socket: SocketWithUser, next: any) => {
  const token = socket.handshake.headers.cookie
    ? socket.handshake.headers.cookie.split("token=")[1]
    : null;

  if (token) {
    let decoded: CustomPayload;

    decoded = (await verifyJWTToken(token)) as CustomPayload;

    if (!decoded) {
      next(new Error("Please Login"));
    }

    const { password, ...user } = await getUserById(decoded.id!);

    if (!user) {
      next(new Error("Please Login"));
    }
    socket.user = user;
    next();
  } else {
    next(new Error("Authentication error"));
  }
};
