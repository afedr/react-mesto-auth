import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form">
        <input
          className="auth__form-input"
          placeholder="Email"
          name="email"
          type="email"
          value={email || ""}
          onChange={handleChangeEmail}
          required
        />
        <input
          className="auth__form-input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={password || ""}
          onChange={handleChangePassword}
          required
        />
        <button
          className="auth__form-submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default withRouter(Login);
