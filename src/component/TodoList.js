import Alert from "./Alert";
import React, { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  updateTodo,
  addError,
  completeTodo,
} from "../features/todo/todoSlice";

function TodoList() {
  const todoData = useSelector((state) => state.todo.data);
  const [todoInput, setTodoInput] = useState("");
  const todoError = useSelector((state) => state.todo.error);
  const todoFilter = useSelector((state) => state.todo.filterValue);
  const filterTodoData = useMemo(() => {
    switch (todoFilter) {
      case "active":
        const uncompletedTodos = todoData?.filter((value) => !value.completed);
        return uncompletedTodos;
      case "completed":
        const completedTodos = todoData?.filter((value) => value.completed);
        return completedTodos;
      default:
        return todoData;
    }
  }, [todoFilter, todoData]);

  const [edit, setEdit] = useState({ id: null, isEdit: false });
  const dispatch = useDispatch();
  const deleteData = (value) => {
    dispatch(deleteTodo({ id: value.id }));
  };
  const editData = (value) => {
    setEdit({ id: value.id, isEdit: true });
  };
  const cancelEdit = () => {
    setEdit({ id: null, isEdit: false });
  };
  const changeData = (value) => {
    if (todoInput === "") {
      dispatch(addError("Todo Cannot be Empty!"));
      return;
    }
    dispatch(addError(null));
    dispatch(updateTodo({ ...value, title: todoInput }));
    setTodoInput("");
    setEdit({ id: null, isEdit: false });
  };
  const complete = (value) => {
    if (value.completed) {
      dispatch(completeTodo({ ...value, completed: false }));
    } else {
      dispatch(completeTodo({ ...value, completed: true }));
    }
  };
  const todoCheck = useRef();
  return (
    <div>
      <div className="container">
        {todoError && <Alert alertType={"alert-danger"} message={todoError} />}

        {todoData.length <= 0 && (
          <Alert alertType={"alert-light"} message={"Todo is Empty!"} />
        )}

        <div className="card mt-3">
          <ul className="list-group list-group-flush">
            {filterTodoData?.map((value) => {
              return (
                <li
                  key={value.id}
                  className="list-group-item d-flex align-items-center"
                >
                  {edit.isEdit && edit.id === value.id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="todo-edit"
                        onChange={(e) => setTodoInput(e.target.value)}
                        value={todoInput}
                        placeholder="Change Todo"
                      />
                      <button
                        type="submit"
                        onClick={() => changeData(value)}
                        className="btn btn-primary"
                      >
                        Change
                      </button>
                      <button
                        type="submit"
                        onClick={cancelEdit}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          ref={todoCheck}
                          checked={value.completed || false}
                          onChange={() => complete(value)}
                          id={value.id}
                        />
                        <label className="form-check-label" htmlFor={value.id}>
                          {value.title}
                        </label>
                      </div>
                      <button
                        onClick={() => editData(value)}
                        className="ms-auto btn btn-outline-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteData(value)}
                        className="ms-2 btn btn-danger"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
