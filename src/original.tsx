import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [postText, setPostText] = useState("");
  const [inputValue, setInputValue] = useState("твой пароль 1488");

  useEffect(() => {
    const moderatedText = moderateTextAndReturn(inputValue);
    setInputValue(moderatedText);
  }, [inputValue]);

  const setRandomTextToPost = () => {
    const randomPostText = "Помогите я ничего не понимаю";
    setPostText(randomPostText);
  };

  const moderateText = () => {
    const originalText = inputValue;
    const moderatedText = originalText.replace("блядь", "*****");
    console.log(moderatedText);
    setInputValue(moderatedText);
  };

  const moderateTextAndReturn = (originalText: string) => {
    const moderatedText = originalText.replace("блядь", "*****");
    console.log(moderatedText);
    return moderatedText;
  };

  return (
    <>
      <div>My post will be: {postText}</div>
      <button onClick={() => setRandomTextToPost()}>random text</button>

      <div>Мои маты: {moderateTextAndReturn(inputValue)}</div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
    </>
  );
}

export default App;
