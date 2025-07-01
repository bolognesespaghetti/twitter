import "./LoginHeader.css";
import { Link } from "wouter";

function LoginHeader({ login, selectedColor }) {
  const loginInitial = login
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="login-header">
        <Link to="/account" className="login-header__avatar_link">
          <div
            className="login-header__avatar"
            style={{ backgroundColor: selectedColor }}
          >
            {loginInitial}
          </div>
        </Link>
        <div className="login-header__text">{login}</div>
      </div>
      ;
    </>
  );
}

export default LoginHeader;
