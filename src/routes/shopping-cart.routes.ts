import { Router } from "express";
import {
  shoppingCartController,
  shoppingCartItemController,
} from "../utils/instances";

const router = Router();

router.post("/shopping-carts", shoppingCartController.create);
router.post("/shopping-carts/items", shoppingCartItemController.create);
router.get(
  "/shopping-carts/users/:userId",
  shoppingCartController.findShoppingCartByUserId
);

export const shoppingCartRouter = router;
