import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./Slice/authslice.ts";
import ProjectSlice from "./Slice/projectSlice.ts";
import User from "./Slice/user.ts"

// Import your reducers here
// import rootReducer from './reducers';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // example: user: userReducer,
    auth: Authslice,
    project: ProjectSlice,
    user:User
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
