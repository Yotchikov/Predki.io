import React from 'react';
import nouser from '../img/nouser.png';

export const PersonPage = ({ person, clickOutside }) => {
  const personData = person.data();
  const name =
    personData.firstName +
    ' ' +
    personData.secondName +
    ' ' +
    personData.lastName;
  const birthDate =
    personData.birthDate.day +
    ' ' +
    personData.birthDate.month +
    ' ' +
    personData.birthDate.year;
  const deathDate =
    personData.deathDate.day +
    ' ' +
    personData.deathDate.month +
    ' ' +
    personData.deathDate.year;

  return (
    <div class="person-page-container">
      <div
        className="position-absolute w-100 h-100"
        onClick={clickOutside}
      ></div>
      <div className="person-page">
        <div className="row">
          <div className="col-3">
            <img src={nouser} />
          </div>
          <div className="col-9">
            <ul className="person-features">
              <li>
                <strong>ФИО:</strong>
                {name}
              </li>
              {birthDate === '  ' ? null : (
                <li>
                  <strong>
                    Родил{personData.sex === 'Мужской' ? 'ся' : 'ась'}:
                  </strong>
                  {birthDate}
                </li>
              )}
              {deathDate === '  ' ? null : (
                <li>
                  <strong>
                    Умер{personData.sex === 'Мужской' ? '' : 'ла'}:
                  </strong>
                  {deathDate}
                </li>
              )}
              {personData.nativeCity === '' ? null : (
                <li>
                  <strong>Родной город:</strong>
                  {personData.nativeCity}
                </li>
              )}
              <li>
                <strong>Биография:</strong>
                {personData.bio ? personData.bio : <i>Биография отсутствует</i>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
