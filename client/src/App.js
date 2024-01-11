import { useEffect, useState } from "react";
import TodoList from "./components/TodoList/TodoList";

//Add API base
const API_BASE = "https://mern-todo-app-5v9b.onrender.com/api/todos";

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
    <div className="bg-slate-500 h-screen pt-14 px-4">
      <div className="max-w-[500px] mx-auto bg-slate-100 rounded-xl">
        <div className="container mx-auto p-5">
          <h1 className="font-bold text-2xl text-center mb-5">MERN Todo App</h1>
          <div className="mx-auto text-center">
            <form className="mb-5">
              <input
                className="px-2 py-1 outline-none border "
                type="text"
                value={input}
                placeholder="Create new todo"
                onChange={(e) => setInput(e.target.value)}
              />{" "}
              <button
                className="bg-black text-white px-2 py-1 ml-3"
                onClick={createTodoHandler}
              >
                Create
              </button>
            </form>
            <TodoList todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
