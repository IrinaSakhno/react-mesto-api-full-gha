import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ onRegister }) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = React.useState(defaultValues);

  function resetForm() {
    setInputs({ ...defaultValues });
  }

  function handleChange(evt) {
    const value = evt.target.value;
    const name = evt.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email: inputs.email, password: inputs.password });
    resetForm();
  }

  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__menu-option link">
          Войти
        </Link>
      </Header>

      <main>
        <div className="login">
          <h2 className="login__title">Регистрация</h2>
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
              Зарегистрироваться
            </button>
          </form>

          <p className="login__text">
            Уже зарегистрированы?{" "}
            <Link className="login__text link" to="/sign-in">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;
