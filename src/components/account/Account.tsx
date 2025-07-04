import "./Account.css";
import Tweet from "../tweets/Tweet";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { handleSignOut } from "../../state/AuthSlice/AuthSlice";
import { useAppSelector } from "../../state/hooks";

function Account() {
  const tweets = useAppSelector((state) => state.tweets.tweets);
  const { login } = useAppSelector((state) => state.auth);
  const tweetsFromAccount = tweets.filter((tweet) => tweet.author == login);
  const dispatch = useDispatch();
  const [_, navigate] = useLocation();

  function clickLogOut() {
    dispatch(handleSignOut());
    navigate("/login");
  }
  return (
    <>
      <div className="account-container">
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
        <button className="logout-button" onClick={clickLogOut}>
          LogOut
        </button>
      </div>
    </>
  );
}

export default Account;
