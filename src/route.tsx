import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./pages/Layout";
import { Products } from "./components/Products";

const Home = lazy(() => import("./pages/Home"));
const Men = lazy(() => import("./pages/Men"));
const Women = lazy(() => import("./pages/Women"));
const Electronics = lazy(() => import("./pages/Electronics"));
const Kids = lazy(() => import("./pages/Kids"));
const HomeAndFurniture = lazy(() => import("./pages/HomeAndFurniture"));
const Cosmetics = lazy(() => import("./pages/Cosmetics"));
const Motorcycle = lazy(() => import("./pages/Motorcycle"));
const SportAndOutdoor = lazy(() => import("./pages/SportAndOutdoor"));
const ShoppingCart = lazy(() => import("./pages/Shopping_cart"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./components/User-Profile"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
//const Category = lazy(() => import("./pages/Category"));
const Other = lazy(() => import("./pages/Other"));
const ResetPassword = lazy(() => import("./components/SignIn/ResetPassword"));

export const ROOT = "/";
export const MEN = "/men";
export const WOMEN = "/women";
export const ELECTRONICS = "/electronics";
export const KIDS = "/kids";
export const HOME_AND_FURNITURE = "/home-and-furniture";
export const COSMETICS = "/cosmetics";
export const MOTORCYCLE = "/motorcycle";
export const SPORT_AND_OUTDOOR = "/sport-and-outdoor";
export const OTHER = "/other-products";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const RESET_PASSWORD = "/reset-password";
export const SHOPPING_CART = "/shopping-cart";
export const PROFILE = "/dashboard/:uid";
export const PRODUCT = "/:category/:id/:title";
export const SPECIAL_OFFERS = "/special_offers/:title";
export const CATEGORY = "/:category/:title";

export const route = createBrowserRouter([
  {
    path: ROOT,
    element: <Layout />,
    children: [
      { path: ROOT, element: <Home /> },
      { path: MEN, element: <Men /> },
      { path: WOMEN, element: <Women /> },
      { path: ELECTRONICS, element: <Electronics /> },
      { path: KIDS, element: <Kids /> },
      { path: HOME_AND_FURNITURE, element: <HomeAndFurniture /> },
      { path: COSMETICS, element: <Cosmetics /> },
      { path: MOTORCYCLE, element: <Motorcycle /> },
      { path: SPORT_AND_OUTDOOR, element: <SportAndOutdoor /> },
      { path: OTHER, element: <Other /> },
      { path: LOGIN, element: <Login /> },
      { path: REGISTER, element: <Register /> },
      { path: RESET_PASSWORD, element: <ResetPassword /> },
      { path: SHOPPING_CART, element: <ShoppingCart /> },
      { path: PROFILE, element: <Profile /> },
      {
        path: PRODUCT,
        element: <ProductPage />,
      },
      {
        path: SPECIAL_OFFERS,
        element: <Products />,
      },
      /* {
        path: CATEGORY,
        element: <Category />,
      }, */
    ],
  },
]);
