import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setpassword] = React.useState("");


    return (
        <section className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form">
                <input className="auth__form-input" placeholder="Email" name="email" type="email" required/>
                <input className="auth__form-input" placeholder="Пароль" name="password" type="password" required/>
                <button className="auth__form-submit-btn" type="submit">Войти</button>
            </form>
        </section>
    )
}

export default withRouter(Login);