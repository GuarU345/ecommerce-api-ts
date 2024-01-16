import { Request, Response, NextFunction } from "express";
import { shoppingCartService } from "../utils/instances";

export class ShoppingCartController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const create = await shoppingCartService.createShoppingCart(req.body);
      return res.json(create);
    } catch (error) {
      next(error);
    }
  }

  async findShoppingCartByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId } = req.params;
    try {
      const shoppingCart = await shoppingCartService.getShoppingCartByUserId(
        userId
      );
      return res.json(shoppingCart);
    } catch (error) {
      next(error);
    }
  }
}
