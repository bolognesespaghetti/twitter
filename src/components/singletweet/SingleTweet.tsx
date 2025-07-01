import { useParams } from "wouter";
import Tweet from "../tweets/Tweet";
import "./SingleTweet.css";

function TweetSingle({ tweets }) {
  const { id } = useParams();

  const tweet = tweets.find((tweet) => tweet.id === id);

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
    </div>
  );
}

export default TweetSingle;
