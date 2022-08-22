import "./header.css";
import headerLogo from "../../images/vector1Icon.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo} />
    </header>
  );
}

export default Header;
