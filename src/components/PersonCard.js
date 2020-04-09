import React, { useState, useEffect } from 'react';
import '../style/person.scss';
import nouser from '../img/nouser.png';
import { PersonPage } from './PersonPage';
import ReactDOM from 'react-dom';
import { EditPerson } from './EditPerson';

export const PersonCard = ({
  person,
  handlePersonSelection,
  selected = false,
  bannedRoles,
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
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [bodyHovered, setBodyHovered] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const style = handlePersonSelection ? { border: 'solid 1px #d048b6' } : null;
  const borderClassName = personData.sex === 'Мужской' ? 'male' : 'female';

  const handleBodyClick = () => {
    if (handlePersonSelection) {
      handlePersonSelection(person.id, relationship);
    } else {
      setShowFull(true);
    }
  };

  const handleRelationshipClick = (msg) => {
    if (
      (msg === 'parent' && bannedRoles[0]) ||
      (msg === 'spouse' && bannedRoles[1]) ||
      (msg === 'child' && bannedRoles[2])
    ) {
      setRelationship(msg);
      if (handlePersonSelection) {
        handlePersonSelection(person.id, msg);
      }
    }
  };

  useEffect(() => {
    ReactDOM.render(
      showEdit ? (
        <EditPerson person={person} handleClose={() => setShowEdit(false)} />
      ) : null,
      document.getElementById('info-container')
    );
  }, [showEdit]);

  useEffect(() => {
    ReactDOM.render(
      showFull ? (
        <PersonPage person={person} clickOutside={() => setShowFull(false)} />
      ) : null,
      document.getElementById('info-container')
    );
  }, [showFull]);

  return (
    <>
      <div className={person.id + ' person'}>
        <div
          className="avatar"
          onMouseEnter={() => setAvatarHovered(true)}
          onMouseLeave={() => setAvatarHovered(false)}
        >
          <img
            src={personData.photo ? personData.photo : nouser}
            style={
              handlePersonSelection
                ? null
                : avatarHovered
                ? { top: -35 + 'px' }
                : null
            }
            onClick={handleBodyClick}
          />
          {handlePersonSelection ? null : (
            <div className="buttons">
              <button
                className="btn btn-edit"
                onClick={() => setShowEdit(true)}
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button className="btn btn-trash">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </div>
        <div
          className="person-body"
          style={selected || bodyHovered ? style : null}
          onClick={handleBodyClick}
          onMouseEnter={() => setBodyHovered(true)}
          onMouseLeave={() => setBodyHovered(false)}
        >
          <h6 className="name">
            {personData.firstName +
              ' ' +
              personData.secondName +
              ' ' +
              personData.lastName}
          </h6>
          <div className="info">
            {birthDate}
            {deathDate !== '  ' ? ' - ' + deathDate : deathDate}
          </div>
          {personData.nativeCity ? (
            <div className="info">
              <a
                href={
                  'https://www.google.ru/maps/search/' + personData.nativeCity
                }
              >
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                {' ' + personData.nativeCity}
              </a>
            </div>
          ) : null}
          <hr className={borderClassName} />
        </div>
        {selected ? (
          <ul className="list-group list-group-horizontal choose-relative">
            <li
              className={
                'list-group-item ' +
                (relationship === 'parent' ? 'selected ' : ' ') +
                (bannedRoles[0] ? null : 'banned')
              }
              onClick={() => handleRelationshipClick('parent')}
            >
              Родитель
            </li>
            <li
              className={
                'list-group-item ' +
                (relationship === 'spouse' ? 'selected ' : ' ') +
                (bannedRoles[1] ? null : 'banned')
              }
              onClick={() => handleRelationshipClick('spouse')}
            >
              Супруг
            </li>
            <li
              className={
                'list-group-item ' +
                (relationship === 'child' ? 'selected ' : ' ') +
                (bannedRoles[2] ? null : 'banned')
              }
              onClick={() => handleRelationshipClick('child')}
            >
              Ребенок
            </li>
          </ul>
        ) : null}
      </div>
    </>
  );
};
