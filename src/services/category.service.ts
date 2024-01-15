import { prisma } from "../libs/prisma";
import { EmptyResponseError } from "../middlewares/custom/errors";
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
      throw new Error("Error al intentar crear la categoria");
    }
  }

  async getAllCategories() {
    try {
      const categories = await prisma.category.findMany();
      if (categories.length === 0) {
        throw new EmptyResponseError("No se encontraron categorias");
      }
      return categories;
    } catch (error) {
      if (error instanceof EmptyResponseError) {
        throw error;
      }
      throw new Error("Error al intentar traer las categorias");
    }
  }
}
