import "./App.css";
import Tweet from "./components/tweet";
import { bulkTweet } from "./data/tweets";
import LoginFrom from "./components/loginForm";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState("");
  const [isShowingLoginOverlay, setShowingLoginOverlay] =
    useState<boolean>(true);
  const [tweets, setTweets] = useState(bulkTweet);
  const [tweetText, setTweetText] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");

  function onLogin(username) {
    setShowingLoginOverlay(false);
    setLogin(username);
  }

  function addTweet(text) {
    const newTweet = {
      id: crypto.randomUUID(),
      author: login,
      text: text,
      date: "21.06",
      likes: 0,
      color: selectedColor,
    };

    setTweets([newTweet, ...tweets]); //позиция важна
  }

  return (
    <>
      {isShowingLoginOverlay && <LoginFrom closeOverlay={onLogin} />}
      <div className="tweetPostFormWrapper">
        <form
          className="tweetPostForm"
          onSubmit={(e) => {
            e.preventDefault();
            if (tweetText.trim()) {
              addTweet(tweetText);
              setTweetText("");
            }
          }}
        >
          <input
            className="tweetPostFormArea"
            type="text"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            placeholder="че происходит?"
          />
          <label className="setColourLable">select a colour: </label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="Gold">Gold</option>
            <option value="DarkOrange">DarkOrange</option>
            <option value="Purple">Purple</option>
          </select>
          <button className="tweetPostFormButton">post</button>
        </form>
      </div>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          author={tweet.author}
          text={tweet.text}
          date={tweet.date}
          likes={tweet.likes}
          color={tweet.color}
        />
      ))}
    </>
  );
}
export default App;
