import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        todo: inputValue,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="todo-field">
        <h1>Get Things Done</h1>
        <div className="todo-form">
          <input
            type="text"
            value={inputValue}
            placeholder="what is the task today?"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addTodo}>Add Task</button>
        </div>
        <ol>
          {todos.map((item) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(item.id)}>{item.todo}</span>
              <button onClick={() => deleteTodo(item.id)}>Delete</button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
