import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  tagTypes: ["Posts"],

  endpoints: (builder) => ({
    // GET all posts
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Posts"],
      refetchOnMountOrArgChange: true,
    }),

    // POST a new post
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),

    // DELETE a post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),

    // UPDATE a post
    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: updatedPost,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = apiSlice;
