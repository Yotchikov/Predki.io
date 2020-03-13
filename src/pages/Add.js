import React, { useCallback } from 'react';
import { SelectDate } from '../components/SelectDate';

export const Add = ({ history }) => {
  const handleAdd = useCallback(
    async event => {
      event.preventDefault();
      try {
        console.log('User added');
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  return (
    <div className="form-wrapper">
      <form className="add" onSubmit={handleAdd}>
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
          <div className="col-6 form-group">
            <label htmlFor="inputDate">Дата смерти *</label>
            <SelectDate />
          </div>
        </div>
        <div className="form-row">
          <div className="col-7 form-group">
            <label htmlFor="nativeCity">Место рождения</label>
            <input
              type="text"
              className="form-control"
              id="nativeCity"
              placeholder="Город"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Фотография</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" lang="ru" />
              <label class="custom-file-label" for="customFile">
                Выбрать файл
              </label>
            </div>
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
          <label htmlFor="">Биография</label>
          <textarea className="form-control"></textarea>
        </div>
      </form>
    </div>
  );
};
