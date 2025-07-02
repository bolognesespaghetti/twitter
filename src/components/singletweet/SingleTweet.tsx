import { useParams, useLocation } from "wouter";
import Tweet from "../tweets/Tweet";
import "./SingleTweet.css";
import { useAppSelector } from "../../state/hooks";

function TweetSingle() {
  // const params = useParams();
  // const id = params.id;
  const { id } = useParams();
  const [_, navigate] = useLocation();
  const tweets = useAppSelector((state) => state.tweets.tweets);
  const tweet = tweets.find((tweet) => tweet.id === id);

  return (
    <div className="tweet-single-page">
      <div className="tweet-single-page_back-button-container">
        <button
          className="tweet-single-page_back-button"
          onClick={() => navigate("/feed")}
        >
          ← go back
        </button>
      </div>
      <Tweet
        key={tweet.id}
        id={tweet.id}
        author={tweet.author}
        text={tweet.text}
        date={tweet.date}
        likes={tweet.likes}
        color={tweet.color}
      />
    </div>
  );
}

export default TweetSingle;
