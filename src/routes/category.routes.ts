import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();
const categoryController = new CategoryController();

router.post("/categories", categoryController.create);
router.get("/categories", categoryController.findAll);

export const categoryRouter = router;
