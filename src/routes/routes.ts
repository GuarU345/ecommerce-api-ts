import { Router } from "express";
import { categoryRouter } from "./category.routes";
import { productRouter } from "./product.routes";

export const router = Router();

router.use(categoryRouter);
router.use(productRouter);
