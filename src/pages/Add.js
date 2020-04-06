import React, { useState } from 'react';
import { SelectDate } from '../components/SelectDate';
import { Main } from './Main';

export const Add = ({ person }) => {
  const [candidate, setCandidate] = useState(null);
  const [firstName, setFirstName] = useState(person ? person.firstName : '');
  const [secondName, setSecondName] = useState(person ? person.secondName : '');
  const [lastName, setLastName] = useState(person ? person.lastName : '');
  const [birthday, setBirthday] = useState(person ? person.birthday : '');
  const [birthmonth, setBirthmonth] = useState(person ? person.birthmonth : '');
  const [birthyear, setBirthyear] = useState(person ? person.birthyear : '');
  const [deathday, setDeathday] = useState(person ? person.deathday : '');
  const [deathmonth, setDeathmonth] = useState(person ? person.deathmonth : '');
  const [deathyear, setDeathyear] = useState(person ? person.deathyear : '');
  const [nativeCity, setNativeCity] = useState(person ? person.nativeCity : '');
  const [sex, setSex] = useState(person ? person.sex : '');
  const [bio, setBio] = useState(person ? person.bio : '');

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

  const handleAdd = (event) => {
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
      bio,
    } = event.target.elements;

    setCandidate({
      firstName: firstName.value,
      secondName: secondName.value,
      lastName: lastName.value,
      birthDate: {
        day: birthday.value,
        month: birthmonth.value,
        year: birthyear.value,
      },
      deathDate: {
        day: deathday.value,
        month: deathmonth.value,
        year: deathyear.value,
      },
      nativeCity: nativeCity.value,
      sex: sex.value,
      bio: bio.value,
    });
  };

  if (candidate) {
    return <Main newPerson={candidate} />;
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
              value={lastName}
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
              value={secondName}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-6 form-group">
            <label htmlFor="birthday">Дата рождения *</label>
            <SelectDate required={false} typeOfDate="birth" />
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
              value={nativeCity}
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
                  value={sex}
                  defaultChecked
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
                  value={sex}
                />
                <label className="form-check-label" htmlFor="female">
                  <i className="fa fa-venus" aria-hidden="true"></i>
                </label>
              </li>
            </ul>
          </div>
          <div className="col-5 form-group">
            <label htmlFor="photo">Фотография *</label>
            <label className="form-control">
              Выбрать файл
              <input name="photo" type="file" hidden />
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Биография *</label>
          <textarea
            className="form-control"
            name="bio"
            placeholder="Места обучения, профессиональные интересы, интересные факты из жизни и т.д."
            value={bio}
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
