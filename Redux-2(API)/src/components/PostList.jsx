import React from "react";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../features/api/apiSlice";

const PostList = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap();
      console.log("Post deleted:", id);
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error aaya hai</p>;

  return (
    <div>
      <h2>All Posts</h2>
      {posts?.map((post) => (
        <div key={post.id} style={{ marginBottom: "1rem" }}>
          <h3>{post.title}</h3>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
