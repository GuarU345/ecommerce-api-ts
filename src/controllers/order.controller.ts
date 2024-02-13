import { NextFunction, Request, Response } from "express";
import { orderService } from "../utils/instances";

export class OrderController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const create = await orderService.createOrder(req.body)
            return res.json(create)
        } catch (error) {
            next(error)
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.query
        let orders = []

        try {
            if (userId) {
                orders = await orderService.getOrdersForUser(userId as string)
                return res.json(orders)
            }
            orders = await orderService.getAllOrders()
            return res.json(orders)
        } catch (error) {
            next(error)
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const order = await orderService.getOrderById(id);
            return res.json(order);
        } catch (error) {
            next(error);
        }
    }
}