import { Errback, NextFunction, Request, Response } from "express";
import { EmptyResponseError, PrismaCustomError } from "./custom/errors";

export const handleError = async (
  error: Errback,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof EmptyResponseError) {
    return res.status(404).json({ error: error.message });
  }
  if (error instanceof PrismaCustomError) {
    return res.status(404).json({ error: error.message });
  }
  return res.status(500).json({ error: "Error interno del servidor" });
};
