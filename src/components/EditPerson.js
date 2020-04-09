import React, { useState } from 'react';
import { SelectDate } from './SelectDate';

export const EditPerson = ({ person, handleClose }) => {
  const [firstName, setFirstName] = useState(
    person ? person.data().firstName : ''
  );
  const [secondName, setSecondName] = useState(
    person ? person.data().secondName : ''
  );
  const [lastName, setLastName] = useState(
    person ? person.data().lastName : ''
  );
  const [birthday, setBirthday] = useState(
    person ? person.data().birthDate.day : ''
  );
  const [birthmonth, setBirthmonth] = useState(
    person ? person.data().birthDate.month : ''
  );
  const [birthyear, setBirthyear] = useState(
    person ? person.data().birthDate.year : ''
  );
  const [deathday, setDeathday] = useState(
    person ? person.data().deathDate.day : ''
  );
  const [deathmonth, setDeathmonth] = useState(
    person ? person.data().deathDate.month : ''
  );
  const [deathyear, setDeathyear] = useState(
    person ? person.data().deathDate.year : ''
  );
  const [nativeCity, setNativeCity] = useState(
    person ? person.data().nativeCity : ''
  );
  const [sex, setSex] = useState(person ? person.data().sex : '');
  const [bio, setBio] = useState(person ? person.data().bio : '');

  const handleInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'secondName':
        setSecondName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'birthday':
        setBirthday(value);
        break;
      case 'birthmonth':
        setBirthmonth(value);
        break;
      case 'birthyear':
        setBirthyear(value);
        break;
      case 'deathday':
        setDeathday(value);
        break;
      case 'deathmonth':
        setDeathmonth(value);
        break;
      case 'deathyear':
        setDeathyear(value);
        break;
      case 'nativeCity':
        setNativeCity(value);
        break;
      case 'sex':
        setSex(value);
        break;
      case 'bio':
        setBio(value);
        break;
      default:
        console.log('Strange feature detected');
        break;
    }
  };

  return (
    <div className="info-page-container">
      <form className="edit" autoComplete={false}>
        <div className="form-row">
          <div className="col d-flex align-items-center">
            <h4 className="mb-0">Редактирование профиля</h4>
          </div>
          <div className="col">
            <button
              type="reset"
              className="btn btn-close"
              aria-label="Close"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
        </div>
        <hr className="heading" />
        <div className="form-row">
          <div className="col form-group">
            <label htmlFor="lastName">Фамилия</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-control"
              placeholder="Иванов"
              value={lastName}
              onChange={handleInput}
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
              value={firstName}
              onChange={handleInput}
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
              value={secondName}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-6 form-group">
            <label htmlFor="birthday">Дата рождения</label>
            <SelectDate
              personDay={birthday}
              personMonth={birthmonth}
              personYear={birthyear}
              required={false}
              typeOfDate="birth"
            />
          </div>
          <div className="col-6 form-group">
            <label htmlFor="deathday">Дата смерти</label>
            <SelectDate
              personDay={deathday}
              personMonth={deathmonth}
              personYear={deathyear}
              required={false}
              typeOfDate="death"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-6 form-group">
            <label htmlFor="nativeCity">Место рождения</label>
            <input
              type="text"
              className="form-control"
              name="nativeCity"
              id="nativeCity"
              placeholder="Город"
              value={nativeCity}
              onChange={handleInput}
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
                  onChange={handleInput}
                  checked={sex === 'Мужской'}
                />
                <label className="form-check-label" htmlFor="male">
                  <i className="fa fa-mars" aria-hidden="true"></i>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  value="Женский"
                  name="sex"
                  id="female"
                  checked={sex === 'Женский'}
                  onChange={handleInput}
                />
                <label className="form-check-label" htmlFor="female">
                  <i className="fa fa-venus" aria-hidden="true"></i>
                </label>
              </li>
            </ul>
          </div>
          <div className="col-5 form-group">
            <label htmlFor="photo">Фотография</label>
            <label className="form-control">
              Выбрать файл
              <input name="photo" type="file" hidden />
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Биография</label>
          <textarea
            className="form-control"
            name="bio"
            placeholder="Места обучения, профессиональные интересы, интересные факты из жизни и т.д."
            value={bio}
            onChange={handleInput}
          ></textarea>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-submit">
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
};
