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
            className="single-tweet__avatar"
            style={{ backgroundColor: color }}
          >
            {initial}
          </div>
          <div className="single-tweet-container">
            <div className="single-tweet-header">
              <div className="single-tweet__author">{author}</div>
              <p className="single-tweet__date">{date}</p>
            </div>
            <p className="single-tweet__text">{text}</p>
            <div className="single-tweet__like-container">
              <button
                className="single-tweet__like-button"
                onClick={() => setLikeCount(likeCount + 1)}
              >
                🤍
              </button>
              <div className="single-tweet__like-count">{likeCount} likes</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tweet;
