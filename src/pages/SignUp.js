import React, { useCallback } from 'react';
import app from '../base';
import '../style/forms.scss';
import { SelectDate } from '../components/SelectDate';

export const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();

      const {
        email,
        password,
        confirmPassword,
        firstName,
        secondName,
        lastName
      } = event.target.elements;

      if (password !== confirmPassword) {
        document
          .getElementById('confirmPassword')
          .setCustomValidity('Пароли не совпадают');
      } else {
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(resp => {
              return app
                .firestore()
                .collection('users')
                .doc(resp.user.uid)
                .set({
                  firstName: firstName.value,
                  secondName: secondName.value,
                  lastName: lastName.value
                });
            });

          history.push('/');
        } catch (error) {
          alert(error);
        }
      }
    },
    [history]
  );

  return (
    <div className="form-wrapper">
      <form className="signup" autoComplete="off" onSubmit={handleSignUp}>
        <div className="form-row">
          <div className="col form-group">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="inputEmail"
              placeholder="you@email.com"
              required
            />
          </div>
          <div className="col form-group">
            <label htmlFor="inputPassword">Пароль</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="inputPassword"
              placeholder="********"
              required
            />
          </div>
          <div className="col form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              id="confirmPassword"
              placeholder="********"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col form-group">
            <label htmlFor="lastName">Фамилия</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-control"
              placeholder="Иванов"
            />
          </div>
          <div className="col form-group">
            <label htmlFor="firstName">Имя</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form-control"
              placeholder="Иван"
            />
          </div>
          <div className="col form-group">
            <label htmlFor="secondName">Отчество</label>
            <input
              type="text"
              name="secondName"
              id="secondName"
              className="form-control"
              placeholder="Иванович"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-6 form-group">
            <label htmlFor="inputDate">Дата рождения</label>
            <SelectDate />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="nativeCity">Место рождения</label>
            <input
              type="text"
              className="form-control"
              id="nativeCity"
              placeholder="Город"
            />
          </div>
          <div className="col-2 form-group">
            <label htmlFor="sex">Пол</label>
            <ul className="sex-choose">
              <li>
                <input
                  type="radio"
                  value="0"
                  name="sex"
                  id="male"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="male">
                  <i className="fa fa-mars" aria-hidden="true"></i>
                </label>
              </li>
              <li>
                <input type="radio" value="1" name="sex" id="female" />
                <label className="form-check-label" htmlFor="female">
                  <i className="fa fa-venus" aria-hidden="true"></i>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-submit">
            Регистрирация
          </button>
          <small className="ml-3">
            <a className="hint" href="/login">
              Уже есть аккаунт?
            </a>
          </small>
        </div>
      </form>
    </div>
  );
};
