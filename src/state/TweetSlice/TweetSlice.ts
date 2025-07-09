import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import RequestsRoute from '../../components/requestsurls';


interface Tweet {
  id: string;
  author: string;
  text: string;
  date: string;
  likes: number;
  color: string;
}

interface TweetState {
  tweets: Tweet[]
}

const initialState: TweetState = {
  tweets: []
}

export const getFeedAsync = createAsyncThunk(
  'tweets/getFeedAsync',
  async () => {
    try {
      const response = await axios.post(RequestsRoute.FEED_URL);
      const data = response.data;
      console.log(data);

      if (data.ok && data.feed) {
        return data.feed
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error(error);
    };
  }
)

export const addPostAsync = createAsyncThunk(
  'tweets/addPostAsync',
  async (tweetText: string) => {
    const token = localStorage.getItem("token");
    const requestData = { postText: tweetText };
    try {
      const response = await axios.post(RequestsRoute.POST_URL, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log(data);

      if (data.ok && data.postId) {
        return data;
      }
    } catch (errors) {
      console.log(errors);
    }
  });

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (state, action: PayloadAction<TweetState>) => {
      const { tweets } = action.payload
      state.tweets = tweets
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedAsync.fulfilled, (state, action) => {
      state.tweets = action.payload
    })
  }
})

export const { setTweets } = tweetsSlice.actions;

export default tweetsSlice.reducer
