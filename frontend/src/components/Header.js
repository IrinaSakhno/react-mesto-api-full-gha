import headerLogo from "../images/header-logo.svg";

function Header({children}) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      {children}
    </header>
  );
}

export default Header;
