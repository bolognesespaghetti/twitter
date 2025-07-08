import "./TweetsFeedPage.css";
import Tweet from "../tweets/tweet";
import { useAppSelector } from "../../state/hooks";
import { useEffect, useState } from "react";
import { addPostAsync, getFeedAsync } from "../../state/TweetSlice/TweetSlice";
import { useDispatch } from "react-redux";

function TweetsFeedPage() {
  const tweets = useAppSelector((state) => state.tweets.tweets);
  const { username, color } = useAppSelector((state) => state.auth);
  const [tweetText, setTweetText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getFeed();
  }, []);

  const initial = username
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  function onSubmit() {
    addPost();
  }

  const addPost = async () => {
    console.log("addPost");
    setTweetText("");
    dispatch(addPostAsync(tweetText));
  };

  // useEffect(() => {
  //   getFeed();
  // }, [addPost]);

  const getFeed = async () => {
    console.log("feed");
    dispatch(getFeedAsync());
  };

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
                    getFeed();
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
