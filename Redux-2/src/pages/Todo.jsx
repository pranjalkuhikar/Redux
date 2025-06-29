import React from "react";
import { useGetTodosQuery } from "../features/api/todoApi";

const Todo = () => {
  const { data, isLoading, isError } = useGetTodosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      <h1>Todos from API</h1>
      {data.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Todo;
