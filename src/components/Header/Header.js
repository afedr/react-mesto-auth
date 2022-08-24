import "./header.css";
import headerLogo from "../../images/vector1Icon.svg";
import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo} />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>

        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-info">
            <p className="header__email">{props.email}</p>
            <Link
              to="/sign-in"
              className="header__link"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default withRouter(Header);
