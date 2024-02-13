export interface CategoryBody {
  name: string;
}

export interface ProductBody {
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
}

export interface ShoppingCartBody {
  user_id: string;
}

export interface ShoppingCartItemBody {
  product_id: string;
  quantity: number;
  shopping_cart_id: string;
}

export interface UserBody {
  username: string;
  email: string;
  password: string;
}

export interface ProductInShoppingCart {
  shopping_cart_id: string;
  quantity: number;
  total: number;
}

export interface FakeStoreResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: Rating;
}

export enum Category {
  Electronics = "electronics",
  Jewelery = "jewelery",
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

export interface Rating {
  rate: number;
  count: number;
}

export interface ShoppingCartItem {
  id: string;
  product_id: string;
  quantity: number;
  total: number;
  shopping_cart_id: string;
}

export interface ShoppingCart {
  id: string;
  date: Date;
  user_id: string;
  ShoppingCartItems: ShoppingCartItem[];
}

export interface OrderBody {
  user_id: string,
  total: number
}

export interface OrderDetail {
  id: string,
  product_id: string,
  quantity: number,
  total: number,
  order_id: string
}

export interface Order {
  id: string,
  date: Date,
  user_id: string,
  OrderDetails: OrderDetail[]
}

export interface OrderDetailBody {
  product_id: string,
  quantity: number,
  total: number,
  order_id: string
}
