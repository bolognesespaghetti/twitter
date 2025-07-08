import "../SignUp/SignUp.css";
import { useDispatch } from "react-redux";
import { signInAsync } from "../../state/AuthSlice/AuthSlice";
import { useState } from "react";
import { useLocation, Link } from "wouter";

function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [_, navigate] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInAsync({ email, password }));
    navigate("/feed");
  };

  return (
    <>
      <div className="login-form-container">
        <div className="login-form-content">
          <div className="login-form-header">Sign in to Twitter </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-form__input-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="login-form__input-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="login-form__submit">Submit</button>
          </form>
          <div className="login-form-border-line"></div>
          <div className="login-form-sigh-up-container">
            <div className="login-form-sign-up">Dont have an account?</div>
            <Link to="/signup" className="login-form-sign-up_link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
