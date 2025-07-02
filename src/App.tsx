import "./App.css";
import { Redirect, Route, Switch, useLocation } from "wouter";
import LoginFrom from "./components/loginform/loginForm.tsx";
import LoginHeader from "./components/loginheader/LoginHeader";
import { useEffect } from "react";
import TweetsFeedPage from "./components/tweetsfeedpage/TweetsFeedPage.tsx";
import TweetSingle from "./components/singletweet/SingleTweet.tsx";
import Account from "./components/account/Account.tsx";
import { useAppSelector } from "./state/hooks.ts";
import { useDispatch } from "react-redux";
import { onLogin as loginAction } from "./state/AuthSlice/AuthSlice.ts";

function App() {
  const tweets = useAppSelector((state) => state.tweets.tweets);
  const login = useAppSelector((state) => state.auth.login);
  const color = useAppSelector((state) => state.auth.color);
  const isUserAuth = useAppSelector((state) => state.auth.isUserAuth);
  const dispatch = useDispatch();

  const [_, navigate] = useLocation();

  function onLogin(login: string, color: string, isUserAuth: boolean) {
    dispatch(loginAction({ login, color, isUserAuth }));
    navigate("/feed");
  }

  function logOut() {
    dispatch(loginAction({ login: "", color: "Gold", isUserAuth: false }));
    navigate("/login");
  }

  // useEffect(() => {
  //   const loginData = JSON.parse(localStorage.getItem("loginData"));
  //   if (loginData && loginData.login && loginData.color) {
  //     onLogin(loginData.login, loginData.color);
  //   }
  // }, []);

  function addTweet(text: string) {
    const newTweet = {
      id: crypto.randomUUID(),
      author: login,
      text: text,
      date: "21.06",
      likes: 0,
      color: color,
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
          color={color}
        />
      </Route>
      <Route path="/tweets/:id">
        <TweetSingle tweets={tweets} />
      </Route>
      <LoginHeader login={login} selectedColor={color} />
      <Route path="/account">
        <Account login={login} tweets={tweets} onLogout={logOut} />
      </Route>
    </>
  );
}
export default App;
