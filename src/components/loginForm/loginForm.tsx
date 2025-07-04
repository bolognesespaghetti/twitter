import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../../state/AuthSlice/AuthSlice";
import { useState } from "react";
import { useLocation } from "wouter";

function LoginForm() {
  // const [loginError, setLoginError] = useState("");
  // const login = useAppSelector((state) => state.auth.login);
  // const color = useAppSelector((state) => state.auth.color);
  // const isUserAuth = useAppSelector((state) => state.auth.isUserAuth);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedColor, setSelectedColor] = useState("Gold");
  const dispatch = useDispatch();
  const [_, navigate] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");
    if (username.trim().split(" ").length !== 2) {
      setUsernameError("Login must contain 2 words");
      return;
    }

    const handleData = {
      username: username,
      color: selectedColor,
      isUserAuth: true,
      password: password,
      email: email,
    };
    dispatch(handleSignIn(handleData));
    localStorage.setItem("loginData", JSON.stringify(handleData));
    navigate("/feed");
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
