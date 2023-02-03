import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: null,
  filterValue: "",
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.data.push(action.payload);
      state.loading = false;
    },
    addError: (state, action) => {
      state.error = action.payload;
    },
    addFilter: (state, action) => {
      state.filterValue = action.payload;
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.data = state.data.filter((value) => value.id !== id);
    },
    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const exisitingData = state.data.find((value) => value.id === id);
      exisitingData.title = title;
    },
    completeTodo: (state, action) => {
      const { id, completed } = action.payload;
      const exisitingData = state.data.find((value) => value.id === id);
      exisitingData.completed = completed;
    },
  },
});

export const {
  addTodo,
  addError,
  deleteTodo,
  updateTodo,
  completeTodo,
  addFilter,
} = todoSlice.actions;
export default todoSlice.reducer;
