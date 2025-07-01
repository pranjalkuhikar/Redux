import React, { useState } from "react";
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../features/api/apiSlice";

const PostList = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap();
      console.log("Post deleted:", id);
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  const handleEditClick = (post) => {
    setEditId(post.id);
    setEditTitle(post.title);
  };

  const handleUpdate = async () => {
    try {
      await updatePost({
        id: editId,
        title: editTitle,
        body: "Updated",
        userId: 1,
      }).unwrap();
      console.log("Post updated:", editId);
      setEditId(null);
      setEditTitle("");
    } catch (err) {
      console.log("Update failed:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error aaya hai</p>;

  return (
    <div>
      <h2>All Posts</h2>
      {posts?.map((post) => (
        <div key={post.id} style={{ marginBottom: "1rem" }}>
          {editId === post.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{post.title}</h3>
              <button onClick={() => handleEditClick(post)}>Edit</button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
