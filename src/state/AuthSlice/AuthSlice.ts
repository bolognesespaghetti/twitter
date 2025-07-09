import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import RequestsRoute from "../../components/requestsurls";
import axios from "axios";

interface LoginState {
    username: string,
    email: string
    color: string,
    isUserAuth: boolean,
    token: string
}

const initialState: LoginState = {
    username: "",
    email: "",
    color: "Gold",
    isUserAuth: false,
    token: "",
};

export interface loginPayload {
    username: string,
    email: string,
    color: string,
    isUserAuth: boolean,
    token: string
}

interface signUpRequest {
    username: string,
    email: string,
    password: string,
    color: string
}

interface sighInReqest {
    email: string,
    password: string,
}

export const signUpAsync = createAsyncThunk(
    "auth/signUpAsync",
    async (userData: signUpRequest) => {
        try {
            const response = await axios.post(
                RequestsRoute.SIGN_UP_URL,
                userData,
                {
                    headers: { "Content-Type": "application/json", },
                }
            );

            const data = await response.data;
            console.log(data);

            if (data.ok && data.token) {
                localStorage.setItem("token", data.token);
                const { token } = data
                return {
                    email: userData.email,
                    username: userData.username,
                    color: userData.color,
                    token: token,
                    isUserAuth: true
                };
            };
        } catch (error) {
            console.log(error);
        }
    })

export const signInAsync = createAsyncThunk(
    "auth/sighInAsync",
    async (userData: sighInReqest) => {
        try {
            const response = await axios.post(
                RequestsRoute.SIGN_IN_URL,
                userData,
                {
                    headers: { "Content-Type": "application/json", },
                }
            );

            const data = await response.data;
            console.log(data);

            if (data.ok && data.token) {
                localStorage.setItem("token", data.token);
                const { username, color, token } = data
                const handleData = {
                    username: username,
                    color: color,
                    email: userData.email,
                }
                localStorage.setItem("loginData", JSON.stringify(handleData));
                return {
                    email: userData.email,
                    username: username,
                    color: color,
                    token: token,
                    isUserAuth: true
                };
            };
        } catch (error) {
            console.log(error);
        }
    })



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleSignIn: (state, action: PayloadAction<loginPayload>) => {
            const { color, isUserAuth, username, email } = action.payload
            state.username = username
            state.email = email
            state.color = color
            state.isUserAuth = isUserAuth
        },
        handleSignOut: (state) => {
            state.username = ""
            state.email = ""
            state.color = 'Gold';
            state.isUserAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpAsync.fulfilled, (state, action) => {
            if (action.payload === undefined) {
                return;
            }
            const { username, email, color, token } = action.payload
            state.username = username;
            state.email = email;
            state.color = color;
            state.isUserAuth = true;
            state.token = token
        })
        builder.addCase(signInAsync.fulfilled, (state, action) => {
            if (action.payload === undefined) {
                return;
            }
            const { username, email, color, token } = action.payload
            state.username = username;
            state.email = email;
            state.color = color;
            state.isUserAuth = true;
            state.token = token
        })
    }
})



export const { handleSignIn, handleSignOut } = authSlice.actions;

export default authSlice.reducer