import { IProduct } from "./product.types";

type TPromoCode = {
  title: string;
  promo_price: number;
  month: string;
};

export interface ICurrentUser {
  about_you: string;
  avatar: string;
  date: number;
  first_name: string;
  last_name: string;
  gender: string;
  isEmailVerified: boolean;
  password: string;
  provider: string;
  user_email: string;
  phone_number: string;
  location: {
    [name: string]: string;
  };
  activated_promo_codes: TPromoCode[];
  shopping_cart: IProduct[];
}
