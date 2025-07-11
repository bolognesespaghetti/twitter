import { useAppSelector } from "../../../../state/hooks";
import Tweet from "../../../tweets/tweet";

export default function TweetList() {


    const tweets = useAppSelector((state) => state.tweets.tweets);
    return (
        <div className="tweets-feed">
            {tweets.map((tweet) => (
                <Tweet
                    id={tweet.id}
                    key={tweet.id}
                    author={tweet.author}
                    text={tweet.text}
                    date={tweet.date}
                    likes={tweet.likes}
                    color={tweet.color}
                />
            ))}
        </div>
    )
}