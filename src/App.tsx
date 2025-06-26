import "./App.css";
import Tweet from "./components/tweets/tweet";
import { bulkTweet } from "./data/tweets";
import LoginFrom from "./components/loginForm/loginForm";
import { useState, useEffect } from "react";

function App() {
  const [login, setLogin] = useState("");
  const [tweets, setTweets] = useState(bulkTweet);
  const [tweetText, setTweetText] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [isShowingLoginOverlay, setShowingLoginOverlay] =
    useState<boolean>(true);

  function onLogin(username: string, color: string) {
    setShowingLoginOverlay(false);
    setLogin(username);
    setSelectedColor(color);
  }

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData && loginData.login && loginData.color) {
      onLogin(loginData.login, loginData.color);
    }
  }, []);

  const loginInitial = login
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  function addTweet(text: string) {
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
      {isShowingLoginOverlay && <LoginFrom onLogin={onLogin} />}
      <div className="tweetsPageContainer">
        <div className="tweetsPageContent">
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
              <button className="tweetPostFormButton">post</button>
            </form>
          </div>
          <div className="tweetsContainer">
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
          </div>
          <div className="loginHeader">
            <div
              className="loginHeaderAvatar"
              style={{ backgroundColor: selectedColor }}
            >
              {loginInitial}
            </div>
            <div className="loginHeaderText">{login}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
