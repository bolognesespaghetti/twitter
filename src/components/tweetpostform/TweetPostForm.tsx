import "./TweetPostForm.css";

function TweetPostForm({ tweetText, setTweetText, onSubmit }) {
  return (
    <>
      <div className="tweets-post-form-wrapper">
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
      </div>
    </>
  );
}

export default TweetPostForm;
