import { useEffect, useState } from "react";
import TodoList from "./components/TodoList/TodoList";

//Add API base
const API_BASE = "https://mern-todo-app-5v9b.onrender.com:4001/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const createTodoHandler = async (e) => {
    e.preventDefault();
    const data = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: input,
      }),
    }).then((res) => res.json());
    await GetTodos();
    setInput("");
  };

  const GetTodos = () => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetTodos();
  }, []);

  return (
    <div className=" bg-blue-100 h-screen">
      <div className="container mx-auto p-5">
        <h1 className="font-bold text-2xl text-center mb-5">MERN Todo App</h1>
        <form className="mb-5">
          <input
            type="text"
            value={input}
            placeholder="Create new todo"
            onChange={(e) => setInput(e.target.value)}
          />{" "}
          <button onClick={createTodoHandler}>Create</button>
        </form>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
