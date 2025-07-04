import { useParams, useLocation } from "wouter";
import Tweet from "../tweets/tweet";
import "./SingleTweet.css";
import { useAppSelector } from "../../state/hooks";

function TweetSingle() {
  const { id } = useParams();
  const [_, navigate] = useLocation();
  const tweets = useAppSelector((state) => state.tweets.tweets);
  const tweet = tweets.find((tweet) => tweet.id === id);

  return (
    <>
      <button
        className="tweet-single-page_back-button"
        onClick={() => navigate("/feed")}
      >
        ←
      </button>
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
      </div>
    </>
  );
}

export default TweetSingle;
