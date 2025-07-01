import "./App.css";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { bulkTweet } from "./data/tweets";
import LoginFrom from "./components/loginform/LoginForm";
import LoginHeader from "./components/loginheader/LoginHeader";
import { useState, useEffect } from "react";
import TweetsFeedPage from "./components/tweetsfeedpage/TweetsFeedPage.tsx";
import TweetSingle from "./components/singletweet/SingleTweet.tsx";
import Account from "./components/account/Account.tsx";

function App() {
  const [login, setLogin] = useState("");
  const [tweets, setTweets] = useState(bulkTweet);
  const [tweetText, setTweetText] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [_, navigate] = useLocation();

  function onLogin(username: string, color: string) {
    setLogin(username);
    setSelectedColor(color);
    setIsUserAuth(true);
    navigate("/feed");
  }

  function logOut() {
    setLogin("");
    setIsUserAuth(false);
    localStorage.removeItem("loginData");
    navigate("/login");
  }

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData && loginData.login && loginData.color) {
      onLogin(loginData.login, loginData.color);
    }
  }, []);

  function addTweet(text: string) {
    const newTweet = {
      id: crypto.randomUUID(),
      author: login,
      text: text,
      date: "21.06",
      likes: 0,
      color: selectedColor,
    };

    setTweets([newTweet, ...tweets]);
  }
  if (isUserAuth === false) {
    return (
      <>
        <Switch>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <LoginFrom onLogin={onLogin} />
          </Route>
        </Switch>
      </>
    );
  }

  return (
    <>
      <Route path="/feed">
        <TweetsFeedPage
          tweetText={tweetText}
          setTweetText={setTweetText}
          onSubmit={addTweet}
          tweets={tweets}
          author={login}
          color={selectedColor}
        />
      </Route>
      <Route path="/tweets/:id">
        <TweetSingle tweets={tweets} />
      </Route>
      <LoginHeader login={login} selectedColor={selectedColor} />
      <Route path="/account">
        <Account login={login} tweets={tweets} onLogout={logOut} />
      </Route>
    </>
  );
}
export default App;
