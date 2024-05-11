export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  brand?: string;
  stock?: number;
  rating: number;
  images: Record<number, string>[];
  thumbnail?: string;
}

export interface IShoppingCartSlice extends IProduct {
  quantity: number;
  isCheckboxActive: boolean;
}

export interface IProductCards {
  products: IProduct[];
}
