import { Router } from "express";
import { categoryController } from "../utils/instances";

const router = Router();

router.post("/categories", categoryController.create);
router.get("/categories", categoryController.findAll);
router.get("/categories/:id", categoryController.findOne);
router.put("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.remove);

export const categoryRouter = router;
