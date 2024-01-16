import { CategoryController } from "../controllers/category.controller";
import { ProductController } from "../controllers/product.controller";
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services/product.service";

const categoryService = new CategoryService();
const categoryController = new CategoryController();
const productService = new ProductService();
const productController = new ProductController();

export {
  categoryService,
  categoryController,
  productService,
  productController,
};
