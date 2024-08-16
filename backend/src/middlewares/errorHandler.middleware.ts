import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { errorResponse } from "../utils/apiResponse";
import { AppError } from "../utils/errors";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(errorResponse(err.message));
  }

  if (err instanceof z.ZodError) {
    const errorMessages = err.errors.map(
      (issue: any) => `${issue.path.join(".")} is ${issue.message}`
    );

    return res.status(400).json(errorResponse(errorMessages));
  }

  return res.status(500).json(errorResponse("Internal Server Error"));
};
