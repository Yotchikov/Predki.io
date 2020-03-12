import React from 'react';
import '../style/person.scss'

export const PersonCard = () => {
  return (
    <div className="person" id="vito">
      <div className="avatar">
        <img src="img/vito.jpg" alt="" />
        <div className="buttons">
          <button className="btn btn-edit">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="btn btn-trash">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <a href="" className="person-body">
        <h6 className="name">Вито Корлеоне</h6>
        <p className="age">
          07.01.1891 - 29.07.1955
          <br />
          <i className="fa fa-map-marker" aria-hidden="true"></i>
          Корлеоне
        </p>
      </a>
    </div>
  );
};
