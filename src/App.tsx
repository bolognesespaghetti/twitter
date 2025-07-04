import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "wouter";

import Account from "./components/account/Account.tsx";
import LoginFrom from "./components/loginform/loginForm.tsx";
import LoginHeader from "./components/loginheader/LoginHeader";
import TweetSingle from "./components/singletweet/SingleTweet.tsx";
import TweetsFeedPage from "./components/tweetsfeedpage/TweetsFeedPage.tsx";
import { handleSignIn } from "./state/AuthSlice/AuthSlice.ts";
import { useAppSelector } from "./state/hooks.ts";

function App() {
  const { isUserAuth } = useAppSelector((state) => state.auth);
  const [isAppReady, setIsAppReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const rawData = localStorage.getItem("loginData");
    if (rawData === null) {
      setIsAppReady(true);
      return;
    }
    const loginData = JSON.parse(rawData);
    if (
      loginData &&
      loginData.username &&
      loginData.color &&
      loginData.email &&
      loginData.password
    ) {
      const handleData = {
        username: loginData.username,
        color: loginData.color,
        isUserAuth: true,
        email: loginData.email,
        password: loginData.password,
      };
      dispatch(handleSignIn(handleData));
      setIsAppReady(true);
    }
  }, []);

  if (isAppReady === false) {
    return <></>;
  }
  if (isUserAuth === false) {
    return (
      <>
        <Route path="/login" component={LoginFrom} />
        <Route>
          <Redirect to="/login" />
        </Route>
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
