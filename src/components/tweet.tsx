import { useState } from "react";
import "../App.css";

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
      <div className="tweet">
        <div className="avatar" style={{ backgroundColor: color }}>
          {initial}
        </div>
        <div className="context">
          <p className="text">{text}</p>
          <p className="date">{date}</p>
          <div className="likeWrapper">
            <button
              className="likeButton"
              onClick={() => setLikeCount(likeCount + 1)}
            >
              🤍
            </button>
            <div className="likeCount">{likeCount}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tweet;
