import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "./features/TodoSlice.js";

const App = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.list);

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo("");
  };

  return (
    <>
      <div>
        <h1>Todo App with Add and Delete</h1>
        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button>Add</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <div key={todo.id}>
              <li>{todo.text}</li>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
