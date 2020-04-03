import React from 'react';
import '../style/person.scss';
import nouser from '../nouser.png';
import { useState } from 'react';

export const PersonCard = ({ person, sendRelative }) => {
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

  const [relativeType, setRelativeType] = useState('parent');
  const [style, setStyle] = useState(null);

  const handleClick = () => {
    setStyle({ border: 'solid 1px #d048b6' });
  };

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
      <div className="person-body" style={style} onClick={handleClick}>
        <h6 className="name">
          {person.firstName + ' ' + person.secondName + ' ' + person.lastName}
        </h6>
        <div className="info">
          {birthDate}
          {deathDate !== '' ? ' - ' + deathDate : deathDate}
        </div>
        <div className="info">
          <a href={'https://www.google.ru/maps/search/' + person.nativeCity}>
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            {' ' + person.nativeCity}
          </a>
        </div>
      </div>
      {style ? (
        <ul className="list-group list-group-horizontal choose-relative">
          <li
            className={
              'list-group-item ' + (relativeType === 'parent' ? 'active' : '')
            }
            onClick={() => setRelativeType('parent')}
          >
            Родитель
          </li>
          <li
            className={
              'list-group-item ' + (relativeType === 'spouse' ? 'active' : '')
            }
            onClick={() => setRelativeType('spouse')}
          >
            Супруг
          </li>
          <li
            className={
              'list-group-item ' + (relativeType === 'child' ? 'active' : '')
            }
            onClick={() => setRelativeType('child')}
          >
            Ребенок
          </li>
        </ul>
      ) : null}
    </div>
  );
};
