import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Login({ onLogin }) {
  const defaultInputValues = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = React.useState(defaultInputValues);

  function handleChange(evt) {
    evt.preventDefault();
    const value = evt.target.value;
    const name = evt.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  function resetForm() {
    setInputs({ ...defaultInputValues });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email: inputs.email, password: inputs.password });
    resetForm();
  }

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__menu-option link">
          Регистрация
        </Link>
      </Header>

      <main>
        <div className="login">
          <h2 className="login__title">Вход</h2>
          <form className="popup__form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              className="popup__form-field popup__form-field_white"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="popup__form-field popup__form-field_white"
              placeholder="Пароль"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="popup__submit-button popup__submit-button_white link"
            >
              Войти
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
