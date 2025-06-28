import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  updateTodo,
} from "../features/todoSlice.js";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all"); // 🔥 filter state

  const dispatch = useDispatch();
  const todoState = useSelector((state) => state.todo.list);

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      dispatch(updateTodo({ id: editId, text: editText }));
      setEditId(null);
      setEditText("");
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          text: todo,
          completed: false,
        })
      );
      setTodo("");
    }
  };

  // 🔥 Filtered todos logic
  const filteredTodos = todoState.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <h1>Todo App</h1>
        <input
          type="text"
          name="todo"
          id="todo"
          value={editId !== null ? editText : todo}
          onChange={(e) =>
            editId !== null
              ? setEditText(e.target.value)
              : setTodo(e.target.value)
          }
        />
        <button type="submit">{editId !== null ? "Update" : "Add"}</button>
      </form>

      {/* 🔥 Filter buttons */}
      <div style={{ margin: "1rem 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* 🔥 Show filtered todos */}
      <div>
        {filteredTodos.map((todo) => (
          <div key={todo.id}>
            <h3
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </h3>

            <button onClick={() => dispatch(completeTodo(todo.id))}>
              {todo.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>

            <button
              onClick={() => {
                setEditId(todo.id);
                setEditText(todo.text);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
