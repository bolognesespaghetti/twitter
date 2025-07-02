import { useAppSelector } from "../../state/hooks";
import "./LoginHeader.css";
import { Link } from "wouter";

function LoginHeader({}) {
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
