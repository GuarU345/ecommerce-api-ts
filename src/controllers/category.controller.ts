import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const create = await categoryService.createCategory(req.body);
      res.json(create);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json(error.message);
      }
    }
  }
}
