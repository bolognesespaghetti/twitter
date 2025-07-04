import "./Account.css";
import Tweet from "../tweets/Tweet";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { handleSignIn, handleSignOut } from "../../state/AuthSlice/AuthSlice";
import { useAppSelector } from "../../state/hooks";

function Account() {
  const tweets = useAppSelector((state) => state.tweets.tweets);
  const { login, color, email, password } = useAppSelector(
    (state) => state.auth
  );
  const tweetsFromAccount = tweets.filter((tweet) => tweet.author == login);
  const dispatch = useDispatch();
  const [_, navigate] = useLocation();

  function clickLogOut() {
    dispatch(handleSignOut());
    navigate("/login");
  }

  const handleSubmit = (e) => {
    return;
  };
  //   e.preventDefault();
  //   setLoginError("");
  //   if (login.trim().split(" ").length !== 2) {
  //     setLoginError("Login must contain 2 words");
  //     return;
  //   }

  //   const handleData = {
  //     login: login,
  //     color: selectedColor,
  //     isUserAuth: true,
  //     email: email,
  //     password: password,
  //   };
  //   dispatch(handleSignIn(handleData));

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
                type="login"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              ></input>
              <input
                className="account-form_input-email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setLogin(e.target.value)}
              ></input>
              <input
                className="account-form_input-password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setLogin(e.target.value)}
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
              {/* <input
                className="account-form_input-color"
                type="color"
                placeholder="color"
                value={color}
                onChange={(e) => setLogin(e.target.value)}
              ></input> */}
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
