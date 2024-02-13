import { Router } from "express";
import { categoryRouter } from "./category.routes";
import { productRouter } from "./product.routes";
import { shoppingCartRouter } from "./shopping-cart.routes";
import { userRouter } from "./user.routes";
import { orderRouter } from "./order.routes";

export const router = Router();

router.use(categoryRouter);
router.use(productRouter);
router.use(shoppingCartRouter);
router.use(orderRouter)
router.use(userRouter);
