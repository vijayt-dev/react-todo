import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, addError, addFilter } from "../features/todo/todoSlice";

function Todo() {
  const todoInput = useRef();
  const todoFilter = useSelector((state) => state.todo.filterValue);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const submitData = () => {
    if (todoInput.current.value === "") {
      dispatch(addError("Todo Cannot be Empty!"));
      return;
    }
    dispatch(addError(null));
    setCounter((previousValue) => previousValue + 1);
    dispatch(
      addTodo({ id: counter, title: todoInput.current.value, completed: false })
    );
    todoInput.current.value = "";
  };
  const handleChange = (e) => {
    dispatch(addFilter(e.target.value));
  };
  return (
    <div className="container">
      <h1 className="mt-5">Todo</h1>
      <div className="row mt-3">
        <div className="col-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="todo-text"
              ref={todoInput}
              placeholder="Add Todo"
            />
            <button
              type="submit"
              onClick={submitData}
              className="btn btn-primary"
            >
              Add Todo
            </button>
          </div>
        </div>
        <div className="col-4">
          <select
            value={todoFilter}
            onChange={handleChange}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Filter</option>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Todo;
