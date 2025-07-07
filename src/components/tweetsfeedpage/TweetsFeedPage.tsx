import "./TweetsFeedPage.css";
import Tweet from "../tweets/tweet";
import { useAppSelector } from "../../state/hooks";
import { useEffect, useState } from "react";
import { setTweets } from "../../state/TweetSlice/TweetSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import RequestsRoute from "../requestsurls";

function TweetsFeedPage() {
  const tweets = useAppSelector((state) => state.tweets.tweets);
  const [tweetText, setTweetText] = useState("");
  const { username, color } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initial = username
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  function onSubmit(text: string) {
    const newTweet = {
      id: crypto.randomUUID(),
      author: username,
      text: text,
      date: "21.06",
      likes: 0,
      color: color,
    };
    const newTweets = { tweets: [newTweet, ...tweets] };
    dispatch(setTweets(newTweets));
  }

  const addPost = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        RequestsRoute.POST_URL,
        { postText: tweetText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);

      if (data.ok && data.postID) {
        feed();
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  const feed = async () => {
    try {
      const response = await axios.post(RequestsRoute.FEED_URL);
      const data = response.data;
      console.log(data);

      if (data.ok && data.feed) {
        // const updatedTweets = [...data.feed, ...tweets];
        dispatch(setTweets({ tweets: data.feed }));
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    feed();
  }, []);

  return (
    <>
      <div className="tweets-feed-page-container">
        <div className="tweets-page-container">
          <div className="tweets-page-content">
            <div className="tweets-post-form-container">
              <div
                className="tweets-post-avatar"
                style={{ backgroundColor: color }}
              >
                {initial}
              </div>
              <form
                className="tweets-post-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (tweetText.trim()) {
                    onSubmit(tweetText);
                    addPost();
                    setTweetText("");
                  }
                }}
              >
                <input
                  className="tweets-post-form__input"
                  type="text"
                  value={tweetText}
                  onChange={(e) => setTweetText(e.target.value)}
                  placeholder="Что происходит?"
                />
                <div className="tweets-post-form_button-container">
                  <button className="tweets-post-form__button">Post</button>
                </div>
              </form>
            </div>
            <div className="tweets-feed">
              {tweets.map((tweet) => (
                <Tweet
                  id={tweet.id}
                  key={tweet.id}
                  author={tweet.author}
                  text={tweet.text}
                  date={tweet.date}
                  likes={tweet.likes}
                  color={tweet.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TweetsFeedPage;
