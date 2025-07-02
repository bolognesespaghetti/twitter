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
        onLogin: (state, action: PayloadAction<loginPayload>) => {
            state.login = action.payload.login;
            state.color = action.payload.color;
            state.isUserAuth = action.payload.isUserAuth;
        },
        onSignOut: (state) => {
            state.login = '';
            state.color = 'Gold';
            state.isUserAuth = false;
        }
    },
})

export const {onLogin, onSignOut} = authSlice.actions;

export default authSlice.reducer