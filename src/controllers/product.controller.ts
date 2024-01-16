import { NextFunction, Request, Response } from "express";
import { productService } from "../utils/instances";

export class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const create = await productService.createProduct(req.body);
      return res.json(create);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const { categoryId } = req.query;
    let products = [];
    try {
      if (categoryId) {
        products = await productService.getProductsByCategoryId(
          categoryId as string
        );
        return res.json({ count: products.length, results: products });
      }
      products = await productService.getAllProducts();
      return res.json({ count: products.length, results: products });
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const product = await productService.getProductById(id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const update = await productService.updateProduct(id, req.body);
      return res.json(update);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await productService.deleteProduct(id);
      return res.json({ remove: true });
    } catch (error) {
      next(error);
    }
  }
}
