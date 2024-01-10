import React from "react";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({ todos, setTodos }) => {
  return (
    <div className="">
      {todos.map((todo) => (
        <TodoItem todo={todo} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;
