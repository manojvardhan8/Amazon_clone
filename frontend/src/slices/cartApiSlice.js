// frontend/src/slices/cartApiSlice.js
import { apiSlice } from './apiSlice';
const CART_URL = '/api/cart';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({ url: CART_URL }),
      providesTags: ['Cart'], // Caching tag
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: CART_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'], // Invalidate cache on update
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation } = cartApiSlice;