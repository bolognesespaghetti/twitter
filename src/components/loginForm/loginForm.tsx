import "./LoginForm.css";
import { useState } from "react";

function LoginForm({ onLogin }) {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [selectedColor, setSelectedColor] = useState("Gold");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.trim().split(" ").length !== 2) {
      setLoginError("Login must contain 2 words");
      return;
    }

    localStorage.setItem(
      "loginData",
      JSON.stringify({ login: login, color: selectedColor })
    );
    onLogin(login, selectedColor);
    setLogin("");
  };

  return (
    <>
      <div className="overlay-login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form__label">Login: </label>
          <input
            className="login-form__input"
            type="login"
            placeholder="insert login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></input>
          {loginError !== "" && loginError}
          <label className="login-form__color-selector">select a color: </label>
          <select
            defaultValue={"Gold"}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="Gold">Gold</option>
            <option value="DarkOrange">DarkOrange</option>
            <option value="Purple">Purple</option>
          </select>
          <button className="login-form__submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
