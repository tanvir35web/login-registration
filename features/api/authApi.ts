import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getDashboard: builder.query({
      query: () => "/dashboard",
    }),
    getProducts: builder.query({
      query: () => "/products"
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetDashboardQuery, useGetProductsQuery, useGetProductByIdQuery } =
  authApi;
