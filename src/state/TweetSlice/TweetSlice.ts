import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Tweet {
    id: string;
    author: string;
    text: string;
    date: string;
    likes: number;
    color: string;
}

interface TweetState {
    tweets : Tweet[]
}

const initialState: TweetState = {
    tweets: []
}

const tweetsSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {setTweets: (state, action: PayloadAction<TweetState>) => {
            const {tweets}  = action.payload
            state.tweets = tweets
}}
})

export const {setTweets} = tweetsSlice.actions;

export default tweetsSlice.reducer
