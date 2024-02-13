import { Router } from "express";
import { orderController, orderDetailController } from "../utils/instances";

const router = Router()

router.get("/orders", orderController.findAll)
router.get("/orders/:id", orderController.findOne)
router.post("/orders", orderController.create)
router.get("/orders/:id/items", orderController.getOrderInfo)
router.post("/orders/items", orderDetailController.create)

export const orderRouter = router