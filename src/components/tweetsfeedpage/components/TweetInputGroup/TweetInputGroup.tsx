import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { addPostAsync } from "../../../../state/TweetSlice/TweetSlice";

export default function TweetInputGroup() {
    const { username, color } = useAppSelector((state) => state.auth);
    const [tweetText, setTweetText] = useState("");
    const dispatch = useAppDispatch();

    const initial = username
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase();


    const addPost = async () => {
        console.log("addPost");
        setTweetText("");
        await dispatch(addPostAsync(tweetText));
    };


    return (
        <div className="tweets-post-form-container">
            <div
                className="tweets-post-avatar"
                style={{ backgroundColor: color }}
            >
                {initial}
            </div>
            <form
                className="tweets-post-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (tweetText.trim()) {
                        addPost();
                    }
                }}
            >
                <input
                    className="tweets-post-form__input"
                    type="text"
                    value={tweetText}
                    onChange={(e) => setTweetText(e.target.value)}
                    placeholder="Что происходит?"
                />
                <div className="tweets-post-form_button-container">
                    <button className="tweets-post-form__button">Post</button>
                </div>
            </form>  </div>
    )
}