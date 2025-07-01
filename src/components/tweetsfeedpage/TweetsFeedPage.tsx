import "./TweetsFeedPage.css";
import Tweet from "../tweets/Tweet";

function TweetsFeedPage({
  tweetText,
  setTweetText,
  onSubmit,
  tweets,
  author,
  color,
}) {
  const initial = author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

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
                    setTweetText("");
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
                  <button className="tweets-post-form__button">post</button>
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
