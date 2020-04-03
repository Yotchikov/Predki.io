import React from 'react';
import '../style/person.scss';
import nouser from '../nouser.png';

export const PersonCard = ({ person }) => {
  const birthDate = person.birthDate
    ? person.birthDate.day +
      ' ' +
      person.birthDate.month +
      ' ' +
      person.birthDate.year
    : '';

  const deathDate = person.deathDate
    ? person.deathDate.day +
      ' ' +
      person.deathDate.month +
      ' ' +
      person.deathDate.year
    : '';

  return (
    <div className="person">
      <div className="avatar">
        <img src={nouser} alt="" />
        <div className="buttons">
          <button className="btn btn-edit">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="btn btn-trash">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <a href="/" className="person-body">
        <h6 className="name">
          {person.firstName + ' ' + person.secondName + ' ' + person.lastName}
        </h6>
        <p className="age">
          {birthDate}
          {deathDate !== '' ? ' - ' + deathDate : deathDate}
          <br />
          <i className="fa fa-map-marker" aria-hidden="true"></i>
          {' ' + person.nativeCity}
        </p>
      </a>
    </div>
  );
};
