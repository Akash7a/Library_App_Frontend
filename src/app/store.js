import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice.js";
import studentReducer from "../features/Student/StudentSlice.js";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        student:studentReducer,
    }
});
