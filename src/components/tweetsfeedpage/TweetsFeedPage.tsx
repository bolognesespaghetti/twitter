import "./TweetsFeedPage.css";
import Tweet from "../tweets/Tweet";

function TweetsFeedPage({ tweetText, setTweetText, onSubmit, tweets }) {
  return (
    <>
      <div className="tweets-feed-page-container">
        <div className="tweets-page-container">
          <div className="tweets-page-content">
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
                placeholder="че происходит?"
              />
              <button className="tweets-post-form__button">post</button>
            </form>
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
      </div>
    </>
  );
}

export default TweetsFeedPage;
