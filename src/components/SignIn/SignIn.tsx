import "../loginform/loginForm.css";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../../state/AuthSlice/AuthSlice";
import { useState } from "react";
import { useLocation } from "wouter";
import axios from "axios";
import RequestsRoute from "../requestsurls";

function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [_, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [selectedColor, setSelectedColor] = useState("Gold");

  // const handleData = {
  //   username: username,
  //   color: selectedColor,
  //   isUserAuth: true,
  //   password: password,
  //   email: email,
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        RequestsRoute.SIGN_IN_URL,
        {
          password: password,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
        }
      );

      const data = response.data;
      console.log(data);

      if (data.ok && data.username && data.token && data.color) {
        dispatch(
          handleSignIn({
            email,
            username: data.username,
            color: data.color,
            token: data.token,
            isUserAuth: true,
          })
        );
        navigate("/feed");
      }
    } catch (error) {
      console.log(error);
    }
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
        </div>
      </div>
    </>
  );
}

export default SignIn;
