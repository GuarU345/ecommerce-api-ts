import { prisma } from "../libs/prisma";
import { CustomError } from "../middlewares/custom/errors";
import { OrderBody } from "../types/interfaces";
import { STATUS_CODES } from "../utils/constants";

export class OrderService {
    async createOrder(body: OrderBody) {
        const { user_id, total } = body
        try {
            const create = await prisma.order.create({
                data: {
                    user_id: user_id,
                    total: total
                }
            })
            return create
        } catch (error) {
            throw new CustomError("Error al tratar de crear la orden", STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllOrders() {
        try {
            const orders = await prisma.order.findMany()
            return orders
        } catch (error) {
            throw new CustomError("Error al tratar de traer las ordenes", STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }

    async getOrdersForUser(userId: string) {
        try {
            const orders = await prisma.order.findMany({
                where: {
                    user_id: userId
                }
            })
            return orders
        } catch (error) {
            throw new CustomError("Error al tratar de traer las ordenes por usuario", STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }

    async getOrderById(id: string) {
        try {
            const order = await prisma.order.findUniqueOrThrow({
                where: {
                    id
                },
                include: {
                    OrderDetail: true
                }
            })
            return order
        } catch (error) {
            throw new CustomError("Error al tratar de encontrar la orden", STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }
}