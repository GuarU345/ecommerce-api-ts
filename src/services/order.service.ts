import { prisma } from "../libs/prisma";
import { CustomError } from "../middlewares/custom/errors";
import { Order, OrderBody } from "../types/interfaces";
import { STATUS_CODES } from "../utils/constants";
import { productService } from "../utils/instances";

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

    async getOrderById({ id, withDetails }: { id: string, withDetails?: boolean }) {
        try {
            const order = await prisma.order.findUniqueOrThrow({
                where: {
                    id
                },
                include: {
                    OrderDetail: withDetails
                }
            })
            return order
        } catch (error) {
            throw new CustomError("Error al tratar de encontrar la orden", STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }

    async getOrderInfo(orderId: string) {
        try {
            const order = await this.getOrderById({ id: orderId, withDetails: true })

            const orderItemsIds = order.OrderDetail.map(orderDetail => orderDetail.product_id)

            const findProducts = await productService.findProductByIds(orderItemsIds)

            const productsInfo = findProducts.flatMap(product => {
                return order.OrderDetail.map(orderDetail => {
                    if (product.id === orderDetail.product_id) {
                        return {
                            ...product,
                            buy_quantity: orderDetail.quantity,
                            total: orderDetail.total
                        }
                    }
                }).filter(Boolean)
            })

            return {
                id: order.id,
                total: order.total,
                order_date: order.date,
                results: {
                    products: productsInfo
                }
            }
        } catch (error) {
            throw new CustomError("Error al tratar de encontrar la informacion de la orden", STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }
}