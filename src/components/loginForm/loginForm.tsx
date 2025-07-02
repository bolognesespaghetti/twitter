import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { onLogin as loginAction } from "../../state/AuthSlice/AuthSlice";
import { useAppSelector } from "../../state/hooks.ts";

function LoginForm({ onLogin }) {
  // const [login, setLogin] = useState("");
  // const [loginError, setLoginError] = useState("");
  // const [selectedColor, setSelectedColor] = useState("Gold");
  const login = useAppSelector((state) => state.auth.login);
  const color = useAppSelector((state) => state.auth.color);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (login.trim().split(" ").length !== 2) {
    //   setLoginError("Login must contain 2 words");
    //   return;
    // }

    // localStorage.setItem(
    //   "loginData",
    //   JSON.stringify({ login: login, color: selectedColor })
    // );
    onLogin(login, color);
    // setLogin("");
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
            onChange={(e) => dispatch(loginAction({ login: login }))}
          ></input>
          {/* {loginError !== "" && loginError} */}
          <label className="login-form__color-selector">select a color: </label>
          <select
            defaultValue={"Gold"}
            value={color}
            onChange={(e) => dispatch(loginAction({ color: color }))}
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
