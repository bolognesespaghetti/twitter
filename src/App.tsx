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
import { handleSignIn } from "./state/AuthSlice/AuthSlice.ts";

function App() {
  const { isUserAuth } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const rawData = localStorage.getItem("loginData");
    if (rawData === null) {
      return;
    }
    const loginData = JSON.parse(rawData);
    if (loginData && loginData.login && loginData.color) {
      const handleData = {
        login: loginData.login,
        color: loginData.color,
        isUserAuth: true,
      };
      dispatch(handleSignIn(handleData));
    }
  }, []);

  if (isUserAuth === false) {
    return (
      <>
        <Switch>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <LoginFrom />
          </Route>
        </Switch>
      </>
    );
  }

  return (
    <>
      <Route path="/feed">
        <TweetsFeedPage />
      </Route>
      <Route path="/tweets/:id">
        <TweetSingle />
      </Route>
      <LoginHeader />
      <Route path="/account">
        <Account />
      </Route>
    </>
  );
}
export default App;
