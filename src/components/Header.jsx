import logo from "../assets/ic-logo.svg";

function Header() {
  return (
    <header className="header">
      <img alt="fall in daily" src={logo} className="logo-image" />

      <button className="create-logs-button">스터디 만들기</button>
    </header>
  );
}

export default Header;
