import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "./features/todoSlice.js";

const App = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.list);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo("");
  };

  const deleteHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>Todo App</h1>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((data) => (
          <div key={data.id}>
            <li>{data.text}</li>
            <button onClick={() => deleteHandler(data.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </>
  );
};

export default App;
