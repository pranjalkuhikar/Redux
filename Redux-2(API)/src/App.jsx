import React from "react";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";

const App = () => {
  return (
    <div>
      <h1>RTK Query Example</h1>
      <AddPost />
      <hr />
      <PostList />
    </div>
  );
};

export default App;
