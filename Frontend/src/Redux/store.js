import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./Slice/authslice.js";

// Import your reducers here
// import rootReducer from './reducers';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // example: user: userReducer,
    auth: Authslice,
  },
});

export default store;
