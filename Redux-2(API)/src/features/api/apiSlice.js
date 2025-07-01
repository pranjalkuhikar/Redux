import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    // GET all posts
    getPosts: builder.query({
      query: () => "posts",
    }),

    // POST a new post
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
    // DELETE a post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
    // UPDATE a post
    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: updatedPost,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = apiSlice;
