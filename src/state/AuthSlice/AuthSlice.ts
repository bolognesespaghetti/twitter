import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    isUserAuth : false,
    token: "",
};

interface loginPayload {
    username: string,
    email: string,
    color: string,
    isUserAuth: boolean,
    token: string
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleSignIn: (state, action: PayloadAction<loginPayload>) => {
            const { color, isUserAuth, username, email} = action.payload
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
})



export const {handleSignIn, handleSignOut} = authSlice.actions;

export default authSlice.reducer