import { prisma } from "../libs/prisma";
import { CustomError } from "../middlewares/custom/errors";
import { ProductBody } from "../types/interfaces";
import { STATUS_CODES } from "../utils/constants";
import { categoryService } from "../utils/instances";

export class ProductService {
  async createProduct(body: ProductBody) {
    const { name, description, price, image, category_id } = body;
    try {
      const create = await prisma.product.create({
        data: {
          name,
          description,
          price,
          image,
          category_id,
        },
      });
      return create;
    } catch (error) {
      throw new CustomError(
        "Error al intentar crear un producto",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllProducts() {
    try {
      const products = await prisma.product.findMany();
      if (products.length === 0) {
        throw new CustomError(
          "No se encontraron productos",
          STATUS_CODES.BAD_REQUEST
        );
      }
      return products;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw new CustomError(
        "Error al intentar traer los productos",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getProductById(id: string) {
    try {
      const product = await prisma.product.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return product;
    } catch (error) {
      throw new CustomError(
        "Error al tratar de encontrar el producto",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getProductsByCategoryId(categoryId: string) {
    try {
      const category = await categoryService.getCategoryById(categoryId);

      const products = await prisma.product.findMany({
        where: {
          category_id: category.id,
        },
      });
      if (products.length === 0) {
        throw new CustomError(
          "No se encontraron productos con esta categoria",
          STATUS_CODES.BAD_REQUEST
        );
      }

      return products;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw new CustomError(
        "Error al intentar traer los productos",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateProduct(id: string, body: ProductBody) {
    const { name, description, price, image, category_id } = body;

    try {
      const product = await this.getProductById(id);

      const update = await prisma.product.update({
        data: {
          name,
          description,
          price,
          image,
          category_id,
        },
        where: {
          id: product.id,
        },
      });
      return update;
    } catch (error) {
      throw new CustomError(
        "Error al tratar de actualizar el producto",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.getProductById(id);

      const remove = await prisma.product.delete({
        where: {
          id: product.id,
        },
      });
      return remove;
    } catch (error) {
      throw new CustomError(
        "Error al tratar de eliminar el producto",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
}
