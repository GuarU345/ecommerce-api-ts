import { NextFunction, Request, Response } from "express";
import { userService } from "../utils/instances";

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const create = await userService.signup(req.body);
      return res.json(create);
    } catch (error) {
      next(error);
    }
  }
}
