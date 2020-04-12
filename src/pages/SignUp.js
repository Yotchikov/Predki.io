import React, { useCallback } from 'react';
import app from '../base';
import '../style/forms.scss';
import { SelectDate } from '../components/SelectDate';

export const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();

      const {
        email,
        password,
        confirmPassword,
        firstName,
        secondName,
        lastName,
        birthday,
        birthmonth,
        birthyear,
        nativeCity,
        sex,
      } = event.target.elements;

      if (password.value !== confirmPassword.value) {
        document
          .getElementById('confirmPassword')
          .setCustomValidity('Пароли не совпадают');
      } else {
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((resp) => {
              return app
                .firestore()
                .collection('users')
                .doc(resp.user.uid)
                .set({
                  firstName: firstName.value,
                  secondName: secondName.value,
                  lastName: lastName.value,
                  birthDate: {
                    day: birthday.value,
                    month: birthmonth.value,
                    year: birthyear.value,
                  },
                  nativeCity: nativeCity.value,
                  sex: sex.value,
                })
                .then(() => {
                  const newUserId = app
                    .firestore()
                    .collection('users')
                    .doc(resp.user.uid)
                    .collection('people')
                    .doc().id;

                  app
                    .firestore()
                    .collection('users')
                    .doc(resp.user.uid)
                    .collection('people')
                    .doc(newUserId)
                    .set({
                      firstName: firstName.value,
                      secondName: secondName.value,
                      lastName: lastName.value,
                      birthDate: {
                        day: birthday.value,
                        month: birthmonth.value,
                        year: birthyear.value,
                      },
                      deathDate: {
                        day: '',
                        month: '',
                        year: ''
                      },
                      nativeCity: nativeCity.value,
                      sex: sex.value,
                    });
                  const newFamilyId =
                    '_' +
                    app
                      .firestore()
                      .collection('users')
                      .doc(resp.user.uid)
                      .collection('families')
                      .doc().id;
                  app
                    .firestore()
                    .collection('users')
                    .doc(resp.user.uid)
                    .collection('families')
                    .doc(newFamilyId)
                    .set({
                      [sex.value === 'Мужской' ? 'husband' : 'wife']: newUserId,
                      children: [],
                    });
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
              required
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
              required
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
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-7 form-group">
            <label htmlFor="birthday">Дата рождения</label>
            <SelectDate
              personDay={''}
              personMonth={''}
              personYear={''}
              required={true}
              typeOfDate="birth"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="nativeCity">Место рождения</label>
            <input
              type="text"
              className="form-control"
              id="nativeCity"
              placeholder="Город"
              required
            />
          </div>
          <div className="col-1 form-group">
            <label htmlFor="sex">Пол</label>
            <ul className="sex-choose">
              <li>
                <input
                  type="radio"
                  value="Мужской"
                  name="sex"
                  id="male"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="male">
                  <i className="fa fa-mars" aria-hidden="true"></i>
                </label>
              </li>
              <li>
                <input type="radio" value="Женский" name="sex" id="female" />
                <label className="form-check-label" htmlFor="female">
                  <i className="fa fa-venus" aria-hidden="true"></i>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-submit">
            Регистрация
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
