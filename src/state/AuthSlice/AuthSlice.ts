import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
    username: string,
    password: string,
    email: string
    color: string,
    isUserAuth: boolean,
}

const initialState: LoginState = {
    username: "",
    password: "",
    email: "",
    color: "Gold",
    isUserAuth : false,
};

interface loginPayload {
    username: string,
    password: string,
    email: string,
    color: string,
    isUserAuth: boolean,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleSignIn: (state, action: PayloadAction<loginPayload>) => {
            const { color, isUserAuth, password, username, email} = action.payload
            state.username = username
            state.password = password
            state.email = email
            state.color = color
            state.isUserAuth = isUserAuth
        },
        handleSignOut: (state) => {
            state.username = ""
            state.password = ""
            state.email = ""
            state.color = 'Gold';
            state.isUserAuth = false;
        }
    },
})

export const {handleSignIn, handleSignOut} = authSlice.actions;

export default authSlice.reducer