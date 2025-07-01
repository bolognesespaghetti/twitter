import { useParams, useLocation } from "wouter";
import Tweet from "../tweets/Tweet";
import "./SingleTweet.css";

function TweetSingle({ tweets }) {
  // const params = useParams();
  // const id = params.id;
  const { id } = useParams();
  const tweet = tweets.find((tweet) => tweet.id === id);
  const [_, navigate] = useLocation();

  return (
    <div className="tweet-single-page">
      <Tweet
        key={tweet.id}
        id={tweet.id}
        author={tweet.author}
        text={tweet.text}
        date={tweet.date}
        likes={tweet.likes}
        color={tweet.color}
      />
      <button
        className="tweet-single-page_back-button"
        onClick={() => navigate("/feed")}
        // onClick={() => window.history.back()}
      >
        ← go back
      </button>
    </div>
  );
}

export default TweetSingle;
