import { NextFunction, Request, Response } from "express";

import { errorResponse } from "../utils/apiResponse";
import { AppError } from "../utils/errors";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(errorResponse(err.message));
  }

  return res.status(500).json(errorResponse("Internal Server Error"));
};
