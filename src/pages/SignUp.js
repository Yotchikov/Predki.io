import React, { useCallback } from 'react';
import app from '../base';
import '../style/forms.scss';

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

      if (password != confirmPassword) {
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
            <div className="form-row">
              <div className="col">
                <select className="form-control">
                  <option value="" disabled selected>
                    День
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                  <option>25</option>
                  <option>26</option>
                  <option>27</option>
                  <option>28</option>
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                </select>
              </div>
              <div className="col">
                <select className="form-control">
                  <option value="" disabled selected>
                    Месяц
                  </option>
                  <option>Января</option>
                  <option>Февраля</option>
                  <option>Марта</option>
                  <option>Апреля</option>
                  <option>Мая</option>
                  <option>Июня</option>
                  <option>Июля</option>
                  <option>Августа</option>
                  <option>Сентября</option>
                  <option>Октября</option>
                  <option>Ноября</option>
                  <option>Декабря</option>
                </select>
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Год" />
              </div>
            </div>
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
