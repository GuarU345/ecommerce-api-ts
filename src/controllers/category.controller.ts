import { NextFunction, Request, Response, response } from "express";
import { categoryService } from "../utils/instances";
export class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const create = await categoryService.createCategory(req.body);
      return res.status(201).json(create);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const { name } = req.query;
    try {
      if (name) {
        const category = await categoryService.getCategoryByName(
          name as string
        );
        return res.json(category);
      }
      const categories = await categoryService.getAllCategories();
      return res.json({ count: categories.length, results: categories });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const category = await categoryService.getCategoryById(id);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const update = await categoryService.updateCategory(id, req.body);
      return res.json(update);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await categoryService.deleteCategory(id);
      return res.json({ remove: true });
    } catch (error) {
      next(error);
    }
  }
}
