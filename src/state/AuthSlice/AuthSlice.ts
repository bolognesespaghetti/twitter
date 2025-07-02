import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
    login: string,
    color: string,
    isUserAuth: boolean,
}

const initialState: LoginState = {
  login: "",
  color: "Gold",
  isUserAuth : false
};

interface loginPayload {
    login: string,
    color: string,
    isUserAuth: boolean,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleSignIn: (state, action: PayloadAction<loginPayload>) => {
            const {login, color, isUserAuth} = action.payload
            state.login = login
            state.color = color
            state.isUserAuth = isUserAuth
            // state.login = action.payload.login;
            // state.color = action.payload.color;
            // state.isUserAuth = action.payload.isUserAuth;
        },
        handleSignOut: (state) => {
            state.login = '';
            state.color = 'Gold';
            state.isUserAuth = false;
        }
    },
})

export const {handleSignIn, handleSignOut} = authSlice.actions;

export default authSlice.reducer