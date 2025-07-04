import "./Account.css";
import Tweet from "../tweets/tweet";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { handleSignIn, handleSignOut } from "../../state/AuthSlice/AuthSlice";
import { useAppSelector } from "../../state/hooks";
import { useState } from "react";

function Account() {
  const { username } = useAppSelector((state) => state.auth);
  const [stateUsername, setStateUsername] = useState(username);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedColor, setSelectedColor] = useState("Gold");
  const [usernameError, setUsernameError] = useState("");
  const tweets = useAppSelector((state) => state.tweets.tweets);

  const tweetsFromAccount = tweets.filter((tweet) => tweet.author == username);
  const dispatch = useDispatch();
  const [_, navigate] = useLocation();

  function clickLogOut() {
    dispatch(handleSignOut());
    navigate("/login");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");
    if (stateUsername.trim().split(" ").length !== 2) {
      alert("Login must contain 2 words");
      return;
    }

    const handleData = {
      username: stateUsername,
      color: selectedColor,
      isUserAuth: true,
      email: email,
      password: password,
    };
    localStorage.setItem("loginData", JSON.stringify(handleData));
    dispatch(handleSignIn(handleData));
  };

  return (
    <>
      <div className="account-container">
        <div className="account-content">
          <div className="account-form-container">
            <div className="account-form-lable">
              Basic personal information:
            </div>
            <form className="account-form" onSubmit={handleSubmit}>
              <input
                className="account-form_input-username"
                type="username"
                placeholder="username"
                value={stateUsername}
                onChange={(e) => setStateUsername(e.target.value)}
              ></input>
              {usernameError !== "" && (
                <div className="login-form_error">{usernameError}</div>
              )}
              <input
                className="account-form_input-email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="account-form_input-password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <select
                className="account-form_selector-color"
                defaultValue={"Gold"}
                value={"Gold"}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="Gold">Gold</option>
                <option value="DarkOrange">DarkOrange</option>
                <option value="Purple">Purple</option>
              </select>
              <div className="button-container">
                <button className="update-info-button">Update info</button>
                <button className="logout-button" onClick={clickLogOut}>
                  LogOut
                </button>
              </div>
            </form>
          </div>
          <div className="account-tweets-container">
            <div className="account-tweets">
              {tweetsFromAccount.map((tweet) => (
                <Tweet
                  key={tweet.id}
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

export default Account;
