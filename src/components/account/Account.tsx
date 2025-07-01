import "./Account.css";
import Tweet from "../tweets/Tweet";

function Account({ login, tweets, onLogout }) {
  const tweetsFromAccount = tweets.filter((tweet) => tweet.author == login);

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
        <button className="logout-button" onClick={onLogout}>
          LogOut
        </button>
      </div>
    </>
  );
}

export default Account;
