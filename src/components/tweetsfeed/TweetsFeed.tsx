import "./TweetsFeed.css";

import Tweet from "../tweets/Tweet";

function TweetsFeed({ tweets }) {
  return (
    <>
      <div className="tweets-page-container">
        <div className="tweets-page-content">
          <div className="tweets-feed">
            {tweets.map((tweet) => (
              <Tweet
                id={tweet.id}
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
    </>
  );
}

export default TweetsFeed;
