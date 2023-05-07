import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
//rename to reducer from slice file

export default configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer
    }
})