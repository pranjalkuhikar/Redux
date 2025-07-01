import React, { useState } from "react";
import { useAddPostMutation } from "../features/api/apiSlice";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [addPost] = useAddPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    try {
      await addPost({
        title: title,
        body: "Dummy body",
        userId: 1,
      }).unwrap();
      setTitle("");
      console.log("Post added!");
    } catch (err) {
      console.log("Failed to add post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;
