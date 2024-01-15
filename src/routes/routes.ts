import { Router } from "express";
import { categoryRouter } from "./category.routes";

export const router = Router();

router.use(categoryRouter);
