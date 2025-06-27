import { useState } from "react";
import "./tweet.css";

type TweetProps = {
  author: string;
  text: string;
  date: string;
  likes: number;
  color: string;
};

function Tweet({ author, text, date, likes, color }: TweetProps) {
  const [likeCount, setLikeCount] = useState(likes);

  const initial = author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="tweets-feed-container">
        <div className="single-tweet">
          <div
            className="single-tweet_avatar"
            style={{ backgroundColor: color }}
          >
            {initial}
          </div>
          <div className="single-tweet_context">
            <div className="single-tweet_context_header">
              <div className="single-tweet_context_author">{author}</div>
              <p className="single-tweet_context_date">{date}</p>
            </div>
            <p className="single-tweet_context_text">{text}</p>
            <div className="single-tweet_context_like-container">
              <button
                className="single-tweet_context_like_button"
                onClick={() => setLikeCount(likeCount + 1)}
              >
                🤍
              </button>
              <div className="single-tweet_context_like_count">
                {likeCount} likes
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tweet;
