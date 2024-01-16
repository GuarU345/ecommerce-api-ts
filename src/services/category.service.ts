import { prisma } from "../libs/prisma";
import { CustomError } from "../middlewares/custom/errors";
import { STATUS_CODES } from "../utils/constants";
import { CategoryBody } from "../types/category";

export class CategoryService {
  async createCategory(body: CategoryBody) {
    const { name } = body;
    try {
      const category = await prisma.category.create({
        data: {
          name,
        },
      });
      return category;
    } catch (error) {
      console.error(error);
      throw new CustomError(
        "Error al intentar crear la categoria",
        STATUS_CODES.BAD_REQUEST
      );
    }
  }

  async getAllCategories() {
    try {
      const categories = await prisma.category.findMany();
      if (categories.length === 0) {
        throw new CustomError(
          "No se encontraron categorias",
          STATUS_CODES.BAD_REQUEST
        );
      }
      return categories;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.error(error);
      throw new CustomError(
        "Error al intentar traer las categorias",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await prisma.category.findUniqueOrThrow({
        where: {
          id,
        },
      });
      return category;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.error(error);
      throw new CustomError(
        "Error al tratar de encontrar la categoria",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateCategory(id: string, body: CategoryBody) {
    const { name } = body;

    try {
      const category = await this.getCategoryById(id);

      const update = await prisma.category.update({
        data: {
          name,
        },
        where: {
          id: category.id,
        },
      });
      return update;
    } catch (error) {
      console.error(error);
      throw new CustomError(
        "Error al tratar de actualizar la categoria",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteCategory(id: string) {
    try {
      const category = await this.getCategoryById(id);

      const remove = await prisma.category.delete({
        where: {
          id: category.id,
        },
      });
      return remove;
    } catch (error) {
      throw new CustomError(
        "Error al tratar de eliminar la categoria",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }
}
