import React, { useCallback } from 'react';
import '../style/forms.scss';
import app from '../base';

export const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="form-wrapper">
      <form className="login" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="you@email.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="********"
            required
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-submit">
            Войти
          </button>
          <small className="ml-3">
            <a className="hint" href="/signup">
              Еще нет аккаунта?
            </a>
          </small>
        </div>
      </form>
    </div>
  );
};
