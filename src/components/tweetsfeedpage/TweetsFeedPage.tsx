import "./TweetsFeedPage.css";
import Tweet from "../tweets/Tweet";
import { useAppSelector } from "../../state/hooks";
import { useState } from "react";
import { setTweets } from "../../state/TweetSlice/TweetSlice";
import { useDispatch } from "react-redux";

function TweetsFeedPage() {
  const tweets = useAppSelector((state) => state.tweets.tweets);
  const [tweetText, setTweetText] = useState("");
  const { login, color } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initial = login
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  function onSubmit(text: string) {
    const newTweet = {
      id: crypto.randomUUID(),
      author: login,
      text: text,
      date: "21.06",
      likes: 0,
      color: color,
    };
    const newTweets = { tweets: [newTweet, ...tweets] };
    dispatch(setTweets(newTweets));
  }

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
