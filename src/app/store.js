import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userSlice";
import { postsReducer } from "./features/postsSlice";
import logger from "redux-logger";
export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});
