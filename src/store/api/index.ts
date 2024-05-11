import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PRODUCTS_API_URL = "https://dummyjson.com";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["products"],
  baseQuery: fetchBaseQuery({ baseUrl: PRODUCTS_API_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products?limit=100",
      providesTags: () => [{ type: "products" }],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: () => [{ type: "products" }],
    }),
    getProductsByTitle: builder.query({
      query: (title) => `/products/search?q=${title}&limit=100`,
      providesTags: () => [{ type: "products" }],
    }),
    getProductsOfCategory: builder.query({
      query: (category) => `/products/category/${category}`,
      providesTags: () => [{ type: "products" }],
    }),
    getAllCommentsByPostId: builder.query({
      query: (postId) => `/comments/post/${postId}`,
      providesTags: () => [{ type: "products" }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByTitleQuery,
  useLazyGetProductsByTitleQuery,
  useLazyGetProductsOfCategoryQuery,
  useGetAllCommentsByPostIdQuery,
} = productsApi;
