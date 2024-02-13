import { prisma } from "../libs/prisma";
import { CustomError } from "../middlewares/custom/errors";
import { OrderDetailBody } from "../types/interfaces";
import { STATUS_CODES } from "../utils/constants";

export class OrderDetailService {
    async createOrderDetail(items: OrderDetailBody[]) {
        try {
            const create = await prisma.orderDetail.createMany({
                data: items
            })
            return create
        } catch (error) {
            throw new CustomError("Error al tratar de crear los detalles de la orden", STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }
}