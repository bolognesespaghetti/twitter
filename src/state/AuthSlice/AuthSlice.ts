import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
    login: string,
    color: string,
    isUserAuth: boolean,
    username: string,
    password: string,
    email: string
}

const initialState: LoginState = {
  login: "",
  color: "Gold",
  isUserAuth : false,
  username: "",
  password: "",
  email: "",
};

interface loginPayload {
    login: string,
    color: string,
    isUserAuth: boolean,
    username: string,
    password: string,
    email: "",
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleSignIn: (state, action: PayloadAction<loginPayload>) => {
            const {login, color, isUserAuth, password, username, email} = action.payload
            state.login = login
            state.color = color
            state.isUserAuth = isUserAuth
            state.password = password
            state.username = username
            state.email = email
            // state.login = action.payload.login;
            // state.color = action.payload.color;
            // state.isUserAuth = action.payload.isUserAuth;
        },
        handleSignOut: (state) => {
            state.login = "";
            state.color = 'Gold';
            state.isUserAuth = false;
            state.password = ""
            state.username = ""
            state.email = ""
        }
    },
})

export const {handleSignIn, handleSignOut} = authSlice.actions;

export default authSlice.reducer