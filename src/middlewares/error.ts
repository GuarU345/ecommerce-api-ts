import { NextFunction, Request, Response } from "express";
import { CustomError } from "./custom/errors";
import { STATUS_CODES } from "../utils/constants";

export const handleError = async (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ error: error.message });
  } else {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: "Algo salio mal" });
  }
};
