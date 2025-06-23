import "../App.css";
import { useState } from "react";

function LoginForm({ closeOverlay }) {
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.trim().split(" ").length !== 2) {
      setLoginError("Login must contain 2 words");
      return;
    }
    setLogin("");
    closeOverlay(login);
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
          <button className="loginSubmit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
