import { Router } from "express";
import { productController } from "../utils/instances";

const router = Router();

router.post("/products", productController.create);
router.get("/products", productController.findAll);
router.get("/products/:id", productController.findOne);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.remove);

export const productRouter = router;
