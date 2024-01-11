import React, { useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

const TodoItem = ({ todo, setTodos }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(todo.name);

  const API_BASE = "https://mern-todo-app-5v9b.onrender.com/api/todos";

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(API_BASE + "/" + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Faild to delete a task");
      }
      const data = await response.json();
      setTodos((items) => items.filter((item) => item._id !== data._id));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const saveEditHandler = async (id) => {
    const data = await fetch(API_BASE + "/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: input,
      }),
    }).then((res) => res.json());
    await GetTodos();

    setIsEdit(false);
  };

  const GetTodos = () => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="mb-3">
        <p>{todo.name}</p>
        {isEdit && (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}

        <div className="flex justify-center items-center">
          {!isEdit && (
            <PencilSquareIcon onClick={editHandler} className="h-5 w-5 mr-2" />
          )}

          {!isEdit && (
            <TrashIcon
              className="h-5 w-5"
              onClick={() => deleteHandler(todo._id)}
            />
            // <button >delete</button>
          )}

          {isEdit && (
            <XMarkIcon
              className="mr-2 h-5 w-5"
              onClick={() => setIsEdit(false)}
            />
          )}

          {isEdit && (
            <CheckIcon
              className="h-5 w-5"
              onClick={() => saveEditHandler(todo._id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
