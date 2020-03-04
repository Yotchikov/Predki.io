import React from 'react';
import image from '../img/info-tree.png';
import '../style/forms.scss';

export const Info = () => {
  return (
    <div className="position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-7 d-flex align-items-center">
            <div>
              <p>
                <span style={{ fontWeight: 900, color: '#9733be' }}>Predki.io</span> - это
                удобный онлайн-инструмент для создания и управления родословной.
                Добавьте своих родственников на генеалогическое древо, заполните
                информацию о них и напишите историю своей семьи!
              </p>
              <div className="mt-3">
                <a href="/login" className="btn btn-submit">
                  Войти
                </a>
                <small className="ml-3">
                  <a className="hint" href="/signup">
                    Еще нет аккаунта
                  </a>
                </small>
              </div>
            </div>
          </div>
          <div className="col-5 d-flex align-items-center">
            <img className="w-75" src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
