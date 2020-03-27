import React, { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/Auth';
import { SelectDate } from '../components/SelectDate';
import app from '../base';
import { Tree } from '../components/Tree';

export const Add = ({ history }) => {
  const [addStatus, setAddStatus] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleAdd = useCallback(
    async event => {
      event.preventDefault();

      const {
        firstName,
        secondName,
        lastName,
        birthday,
        birthmonth,
        birthyear,
        deathday,
        deathmonth,
        deathyear,
        nativeCity,
        sex,
        bio
      } = event.target.elements;

      try {
        app
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .collection('people')
          .add({
            firstName: firstName.value,
            secondName: secondName.value,
            lastName: lastName.value,
            birthDate: {
              day: birthday.value,
              month: birthmonth.value,
              year: birthyear.value
            },
            deathDate: {
              day: deathday.value,
              month: deathmonth.value,
              year: deathyear.value
            },
            nativeCity: nativeCity.value,
            sex: sex.value
          });
        setAddStatus(true);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  if (addStatus) {
    return <Tree />;
  }
  return (
    <div className="form-wrapper">
      <form className="add" onSubmit={handleAdd} autoComplete="nope">
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
            <label htmlFor="secondName">Отчество *</label>
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
            <label htmlFor="birthday">Дата рождения</label>
            <SelectDate required={true} typeOfDate="birth" />
          </div>
          <div className="col-6 form-group">
            <label htmlFor="deathday">Дата смерти *</label>
            <SelectDate required={false} typeOfDate="death" />
          </div>
        </div>
        <div className="form-row">
          <div className="col-6 form-group">
            <label htmlFor="nativeCity">Место рождения *</label>
            <input
              type="text"
              className="form-control"
              id="nativeCity"
              placeholder="Город"
            />
          </div>
          <div className="col-5 form-group">
            <label htmlFor="photo">Фотография *</label>
            <label className="form-control">
              Выбрать файл
              <input name="photo" type="file" hidden />
            </label>
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
        <div className="form-group">
          <label htmlFor="bio">Биография *</label>
          <textarea
            className="form-control"
            name="bio"
            placeholder="Места обучения, профессиональные интересы, интересные факты из жизни и т.д."
          ></textarea>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-submit">
            Добавить
          </button>
          <small className="ml-3 hint">
            * Данные поля необязательны к заполнению
          </small>
        </div>
      </form>
    </div>
  );
};
