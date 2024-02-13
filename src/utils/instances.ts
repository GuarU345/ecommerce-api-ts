import { CategoryController } from "../controllers/category.controller";
import { OrderDetailController } from "../controllers/order-detail.controller";
import { OrderController } from "../controllers/order.controller";
import { ProductController } from "../controllers/product.controller";
import { ShoppingCartItemController } from "../controllers/shopping-cart-item.controller";
import { ShoppingCartController } from "../controllers/shopping-cart.controller";
import { UserController } from "../controllers/user.controller";
import { CategoryService } from "../services/category.service";
import { OrderDetailService } from "../services/order-detail.service";
import { OrderService } from "../services/order.service";
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
const orderService = new OrderService()
const orderController = new OrderController()
const orderDetailService = new OrderDetailService()
const orderDetailController = new OrderDetailController()
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
  orderService,
  orderController,
  orderDetailService,
  orderDetailController,
  userService,
  userController,
};
