import "./App.css";
import Tweet from "./components/tweet";
import { bulkTweet } from "./data/tweets";

function App() {
  return (
    <>
      {bulkTweet.map((tweet) => (
        <Tweet
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
