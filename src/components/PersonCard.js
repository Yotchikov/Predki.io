import React from 'react';
import '../style/person.scss';
import nouser from '../nouser.png';
import { useState } from 'react';

export const PersonCard = ({
  person,
  handlePersonSelection,
  selected = false
}) => {
  const personData = person.data();

  const birthDate = personData.birthDate
    ? personData.birthDate.day +
      ' ' +
      personData.birthDate.month +
      ' ' +
      personData.birthDate.year
    : '';

  const deathDate = personData.deathDate
    ? personData.deathDate.day +
      ' ' +
      personData.deathDate.month +
      ' ' +
      personData.deathDate.year
    : '';

  const [relationship, setRelationship] = useState('parent');
  const [hovered, setHovered] = useState(false);
  const style = selected ? { border: 'solid 1px #d048b6' } : null;

  const handleBodyClick = () => {
    if (handlePersonSelection) {
      handlePersonSelection(person.id, relationship);
    }
  };

  const handleRelationshipClick = msg => {
    setRelationship(msg);
    if (handlePersonSelection) {
      handlePersonSelection(person.id, msg);
    }
  };

  return (
    <div className="person">
      <div
        className="avatar"
        onMouseEnter={() => setHovered(!hovered)}
        onMouseLeave={() => setHovered(!hovered)}
      >
        <img
          src={nouser}
          style={
            handlePersonSelection ? null : hovered ? { top: -35 + 'px' } : null
          }
          onClick={handleBodyClick}
        />
        <div className="buttons">
          <button className="btn btn-edit">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="btn btn-trash">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="person-body" style={style} onClick={handleBodyClick}>
        <h6 className="name">
          {personData.firstName +
            ' ' +
            personData.secondName +
            ' ' +
            personData.lastName}
        </h6>
        <div className="info">
          {birthDate}
          {deathDate !== '' ? ' - ' + deathDate : deathDate}
        </div>
        <div className="info">
          <a
            href={'https://www.google.ru/maps/search/' + personData.nativeCity}
          >
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            {' ' + personData.nativeCity}
          </a>
        </div>
      </div>
      {selected ? (
        <ul className="list-group list-group-horizontal choose-relative">
          <li
            className={
              'list-group-item ' + (relationship === 'parent' ? 'selected' : '')
            }
            onClick={() => handleRelationshipClick('parent')}
          >
            Родитель
          </li>
          <li
            className={
              'list-group-item ' + (relationship === 'spouse' ? 'selected' : '')
            }
            onClick={() => handleRelationshipClick('spouse')}
          >
            Супруг
          </li>
          <li
            className={
              'list-group-item ' + (relationship === 'child' ? 'selected' : '')
            }
            onClick={() => handleRelationshipClick('child')}
          >
            Ребенок
          </li>
        </ul>
      ) : null}
    </div>
  );
};
