import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../../state/AuthSlice/AuthSlice";
import { useState } from "react";
import { useLocation } from "wouter";
import RequestsRoute from "../requestsurls.ts";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedColor, setSelectedColor] = useState("Gold");
  const dispatch = useDispatch();
  const [_, navigate] = useLocation();

  const handleData = {
    username: username,
    color: selectedColor,
    isUserAuth: true,
    password: password,
    email: email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError("");
    if (username.trim().split(" ").length !== 2) {
      setUsernameError("Login must contain 2 words");
      return;
    }
    try {
      const response = await axios.post(
        RequestsRoute.SIGN_UP_URL,
        {
          username: username,
          password: password,
          email: email,
          color: selectedColor,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // здесь в signup нужно будет воткнуть Authorization: Bearer {токен}
          },
        }
      );

      const data = await response.data;
      console.log(data);

      if (data.ok && data.token) {
        localStorage.setItem("token", data.token);
        dispatch(
          handleSignIn({
            email,
            username,
            color: selectedColor,
            token: data.token,
            isUserAuth: true,
          })
        );
        navigate("/feed");
        localStorage.setItem("loginData", JSON.stringify(handleData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-form-container">
        <div className="login-form-content">
          <div className="login-form-header">Login to Twitter </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-form__input-username"
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            {usernameError !== "" && (
              <div className="login-form_error">{usernameError}</div>
            )}
            <input
              className="login-form__input-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              className="login-form__input-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <select
              className="login-form__color-selector"
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
      </div>
    </>
  );
}

export default LoginForm;
