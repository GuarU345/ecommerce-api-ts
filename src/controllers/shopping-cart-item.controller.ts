import { NextFunction, Request, Response } from "express";
import { shoppingCartService } from "../utils/instances";

export class ShoppingCartItemController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const create = await shoppingCartService.addProductToShoppingCart(
        req.body
      );
      return res.json(create);
    } catch (error) {
      next(error);
    }
  }
}
