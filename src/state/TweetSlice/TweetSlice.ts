import { createSlice } from '@reduxjs/toolkit';
import { bulkTweets } from '../../data/tweets.ts';

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
    tweets: bulkTweets
}

const tweetsSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {}
})

export default tweetsSlice.reducer
