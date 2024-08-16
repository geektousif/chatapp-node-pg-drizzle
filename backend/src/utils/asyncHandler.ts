import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../types/authHelper.type";

type AsyncFunction = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  (func: AsyncFunction) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
