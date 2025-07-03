import "./LoginHeader.css";

import { Link } from "wouter";

import { useAppSelector } from "../../state/hooks";

function LoginHeader() {
  const { login, color } = useAppSelector((state) => state.auth);
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
            style={{ backgroundColor: color }}
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
