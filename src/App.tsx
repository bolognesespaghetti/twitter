import { useState } from "react";
import "./App.css";

function App() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberMe] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setPasswordError("");

    // проверка на цифры
    if (password.length > 0 && !/\d/.test(password)) {
      setPasswordError("the password must contain at least one digit");
      return;
    }

    console.log({
      login: login,
      password: password,
      rememberme: rememberme,
    });
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Login: </label>
        <input
          type="login"
          placeholder="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {/* примеры тернарных операторов выучи */}
        {passwordError == "" ? `нет ошибки` : passwordError}
        {passwordError !== "" && passwordError}
        <br />

        <br />
        <label> Remember me? </label>
        <input
          type="checkbox"
          checked={rememberme}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}
export default App;
