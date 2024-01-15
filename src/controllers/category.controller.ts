import { NextFunction, Request, Response, response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const create = await categoryService.createCategory(req.body);
      return res.status(201).json(create);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json(error.message);
      }
    }
  }
}
