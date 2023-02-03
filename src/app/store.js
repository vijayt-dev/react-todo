import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/todo/todoSlice";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, todoSlice);

export const store = configureStore({
  reducer: {
    todo: persistedReducer,
    middleware: [thunk],
  },
});

export const persistor = persistStore(store);
