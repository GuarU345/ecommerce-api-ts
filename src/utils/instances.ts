import { CategoryController } from "../controllers/category.controller";
import { ProductController } from "../controllers/product.controller";
import { ShoppingCartItemController } from "../controllers/shopping-cart-item.controller";
import { ShoppingCartController } from "../controllers/shopping-cart.controller";
import { UserController } from "../controllers/user.controller";
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services/product.service";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { UserService } from "../services/user.service";

const categoryService = new CategoryService();
const categoryController = new CategoryController();
const productService = new ProductService();
const productController = new ProductController();
const shoppingCartService = new ShoppingCartService();
const shoppingCartController = new ShoppingCartController();
const shoppingCartItemController = new ShoppingCartItemController();
const userService = new UserService();
const userController = new UserController();

export {
  categoryService,
  categoryController,
  productService,
  productController,
  shoppingCartService,
  shoppingCartController,
  shoppingCartItemController,
  userService,
  userController,
};
