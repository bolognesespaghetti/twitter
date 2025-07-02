import { configureStore } from "@reduxjs/toolkit";
import tweetsReducer from './TweetSlice/TweetSlice';
import authReducer from './AuthSlice/AuthSlice'

export const store = configureStore({
    reducer: {
        tweets: tweetsReducer,
        auth: authReducer,
    }
});

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;