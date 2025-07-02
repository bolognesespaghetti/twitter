import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../../state/AuthSlice/AuthSlice";
import { useAppSelector } from "../../state/hooks.ts";
import { useState } from "react";
import { useLocation } from "wouter";

function LoginForm() {
  // const [loginError, setLoginError] = useState("");
  // const login = useAppSelector((state) => state.auth.login);
  // const color = useAppSelector((state) => state.auth.color);
  // const isUserAuth = useAppSelector((state) => state.auth.isUserAuth);

  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [selectedColor, setSelectedColor] = useState("Gold");
  const dispatch = useDispatch();
  const [_, navigate] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    if (login.trim().split(" ").length !== 2) {
      setLoginError("Login must contain 2 words");
      return;
    }

    const handleData = {
      login: login,
      color: selectedColor,
      isUserAuth: true,
    };
    dispatch(handleSignIn(handleData));
    navigate("/feed");
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
