import { NextFunction, Request, Response } from "express";
import { orderDetailService } from "../utils/instances";


export class OrderDetailController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const create = await orderDetailService.createOrderDetail(req.body)
            return res.json(create)
        } catch (error) {
            next(error)
        }
    }
}