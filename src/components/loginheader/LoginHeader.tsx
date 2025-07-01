import "./LoginHeader.css";

function LoginHeader({ login, selectedColor }) {
  const loginInitial = login
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="login-header">
        <div
          className="login-header__avatar"
          style={{ backgroundColor: selectedColor }}
        >
          {loginInitial}
        </div>
        <div className="login-header__text">{login}</div>
      </div>
      ;
    </>
  );
}

export default LoginHeader;
