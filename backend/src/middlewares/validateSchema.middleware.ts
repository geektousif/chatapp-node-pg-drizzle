import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

const validateSchema =
  (schema: ZodSchema) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

export default validateSchema;
