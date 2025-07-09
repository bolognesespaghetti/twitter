import "./TweetsFeedPage.css";
import { useAppDispatch } from "../../state/hooks";
import { useEffect } from "react";
import { getFeedAsync } from "../../state/TweetSlice/TweetSlice";
import TweetInputGroup from "./components/TweetInputGroup/TweetInputGroup";
import TweetList from "./components/TweetList/TweetList";

function TweetsFeedPage() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeedAsync());
  }, []);

  return (
    <>
      <div className="tweets-feed-page-container">
        <div className="tweets-page-container">
          <div className="tweets-page-content">
            <TweetInputGroup />
            <TweetList />
          </div>
        </div>
      </div>
    </>
  );
}

export default TweetsFeedPage;
