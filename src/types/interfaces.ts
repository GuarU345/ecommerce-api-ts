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
