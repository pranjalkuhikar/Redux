import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

// 🔹 1. localStorage se data load
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : undefined;
  } catch (e) {
    console.warn("Load error", e);
    return undefined;
  }
};

// 🔹 2. localStorage me data save
const saveToLocalStorage = (state) => {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem("todos", data);
  } catch (e) {
    console.warn("Save error", e);
  }
};

// 🔹 3. Store banana with preloadedState
export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: {
    todo: loadFromLocalStorage(), // ✅ yaha load hoga
  },
});

// 🔹 4. Jab bhi state change ho, save kar do
store.subscribe(() => {
  saveToLocalStorage(store.getState().todo); // ✅ yaha se save hoga
});

export default store;
