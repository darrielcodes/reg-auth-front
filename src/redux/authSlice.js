import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogout } from "./userSlice";

export const authLogout = createAsyncThunk('auth/authLogout', async (_, thunkAPI) => {
    localStorage.removeItem('jwtToken')
    thunkAPI.dispatch(userLogout())
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        authSuccess: (state) => {
            state.isAuth = true
        },
        authFailure: (state) => {
            state.isAuth = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(authLogout.fulfilled, (state) => {
                state.isAuth = false
            })
    }
})

export const {authSuccess, authFailure} = authSlice.actions

export default authSlice.reducer