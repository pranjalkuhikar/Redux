import React from "react";
import { useGetPostsQuery } from "../features/api/apiSlice";

const PostList = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error aaya hai</p>;

  return (
    <div>
      <h2>All Posts</h2>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default PostList;
