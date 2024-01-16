import { prisma } from "../libs/prisma";
import { CustomError } from "../middlewares/custom/errors";
import {
  ProductInShoppingCart,
  ShoppingCart,
  ShoppingCartBody,
  ShoppingCartItemBody,
} from "../types/interfaces";
import { STATUS_CODES } from "../utils/constants";
import { getFinalTotal, getTotal } from "../utils/functions";
import {
  productService,
  shoppingCartService,
  userService,
} from "../utils/instances";

export class ShoppingCartService {
  async createShoppingCart(body: ShoppingCartBody) {
    const { user_id } = body;
    try {
      const create = await prisma.shoppingCart.create({
        data: {
          user_id,
        },
      });
      return create;
    } catch (error) {
      throw new CustomError(
        "Error al tratar de crear el carrito",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getShoppingCartById(id: string) {
    try {
      const shoppingCart = await prisma.shoppingCart.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          ShoppingCartItems: true,
        },
      });
      return shoppingCart;
    } catch (error) {
      throw new CustomError(
        "Error al intentar traer el carrito",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getItemByShoppingCartId(shoppingCartId: string) {
    try {
      const item = await prisma.shoppingCartItem.findFirstOrThrow({
        where: {
          shopping_cart_id: shoppingCartId,
        },
      });
      return item;
    } catch (error) {
      throw new CustomError(
        "Error al intentar encontrar el producto en el carrito",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async addProductToShoppingCart(body: ShoppingCartItemBody) {
    const { product_id, quantity, shopping_cart_id } = body;

    const product = await productService.getProductById(product_id);

    const total = getTotal(quantity, product.price);

    try {
      const check = await this.checkProductIsInShoppingCart(
        shopping_cart_id,
        product_id
      );
      if (check) {
        const update = await this.updateProductInShoppingCart({
          shopping_cart_id,
          quantity,
          total,
        });
        return update;
      }
      const create = await prisma.shoppingCartItem.create({
        data: {
          product_id,
          quantity,
          total,
          shopping_cart_id,
        },
      });
      return create;
    } catch (error) {
      throw new CustomError(
        "Error al intentar agregar un producto al carrito",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async checkProductIsInShoppingCart(
    shopping_cart_id: string,
    product_id: string
  ) {
    try {
      const shoppingCart = await this.getShoppingCartById(shopping_cart_id);
      const productIds = shoppingCart.ShoppingCartItems?.map(
        (item) => item.product_id
      );
      const productExists = productIds.includes(product_id);
      return productExists;
    } catch (error) {
      throw new CustomError(
        "Error al verificar si el producto existe en el carrito",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateProductInShoppingCart({
    shopping_cart_id,
    quantity,
    total,
  }: ProductInShoppingCart) {
    try {
      const item = await this.getItemByShoppingCartId(shopping_cart_id);

      const newValues = {
        quantity: quantity + item.quantity,
        total: total + item.total,
      };

      const update = await prisma.shoppingCartItem.update({
        data: {
          quantity: newValues.quantity,
          total: newValues.total,
        },
        where: {
          id: item.id,
        },
      });

      return update;
    } catch (error) {
      throw new CustomError(
        "Error al tratar de actualizar la cantidad y total de un producto en el carrito",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getShoppingCartByUserId(userId: string) {
    try {
      const user = await userService.getUserById(userId);

      const shoppingCart = await prisma.shoppingCart.findFirstOrThrow({
        where: {
          user_id: user.id,
        },
        include: {
          ShoppingCartItems: true,
        },
      });

      const shoppingCartInfo = await this.getShoppingCartInfo(shoppingCart);

      return {
        shopping_cart_id: shoppingCart.id,
        total: shoppingCartInfo.total,
        count: shoppingCart.ShoppingCartItems.length,
        results: {
          products: shoppingCartInfo.products,
        },
      };
    } catch (error) {
      throw new CustomError(
        "Error al tratar de encontrar el carrito",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getShoppingCartInfo(shoppingCart: ShoppingCart) {
    const productInShoppingCartIds = shoppingCart.ShoppingCartItems.map(
      (product: any) => product.product_id
    );

    const findProducts = await prisma.product.findMany({
      where: {
        id: {
          in: productInShoppingCartIds,
        },
      },
    });

    const prices = findProducts.map((product) => product.price);

    const productsInfo = shoppingCart.ShoppingCartItems.flatMap(
      (shoppingCartItem) => {
        return findProducts
          .map((product) => {
            if (shoppingCartItem.product_id === product.id) {
              return {
                ...product,
                buy_quantity: shoppingCartItem.quantity,
              };
            }
          })
          .filter(Boolean);
      }
    );

    return {
      products: productsInfo,
      total: getFinalTotal(prices),
    };
  }
}
