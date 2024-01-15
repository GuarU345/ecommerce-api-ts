import { prisma } from "../libs/prisma";
import { CategoryBody } from "../types/category";

export class CategoryService {
  async createCategory(body: CategoryBody) {
    console.log(body);
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
}
