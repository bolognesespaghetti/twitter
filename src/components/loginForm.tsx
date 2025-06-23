import "../App.css";
import { useState } from "react";

function LoginForm({ onLogin }) {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.trim().split(" ").length !== 2) {
      setLoginError("Login must contain 2 words");
      return;
    }
    setLogin("");
    onLogin(login, selectedColor);
  };

  return (
    <>
      <div className="loginOverlay">
        <form className="loginForm" onSubmit={handleSubmit}>
          <label className="LoginLable">Login: </label>
          <input
            className="inputLoginForm"
            type="login"
            placeholder="insert login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></input>
          {loginError !== "" && loginError}
          <label className="setColourLable">select a colour: </label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="Gold">Gold</option>
            <option value="DarkOrange">DarkOrange</option>
            <option value="Purple">Purple</option>
          </select>
          <button className="loginSubmit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
