import React from 'react';
import app from '../base';
import '../style/menu.scss';

export const Menu = ({ currentPage }) => {
  const checkPage = page => currentPage === page;
  return (
    <div>
      <div className="menu">
        <a href={checkPage('/add') ? '/' : '/add'}>
          <div className="fixed-part">
            <ion-icon
              name={
                checkPage('/add') ? 'arrow-back-circle-sharp' : 'add-circle'
              }
            ></ion-icon>
          </div>
          <div className="slide-out-part">
            {checkPage('/add') ? 'Назад' : 'Добавить человека'}
          </div>
        </a>
        <a href="/share">
          <div className="fixed-part">
            <ion-icon name="share-social-sharp"></ion-icon>
          </div>
          <div className="slide-out-part">Поделиться</div>
        </a>
        <a href="/settings">
          <div className="fixed-part">
            <ion-icon name="cog"></ion-icon>
          </div>
          <div className="slide-out-part">Настройки</div>
        </a>
        <a href="/login" onClick={() => app.auth().signOut()}>
          <div className="fixed-part">
            <ion-icon name="exit"></ion-icon>
          </div>
          <div className="slide-out-part">Выход</div>
        </a>
        <a href={checkPage('/info') ? '/' : '/info'}>
          <div className="fixed-part">
            <ion-icon
              name={
                checkPage('/info')
                  ? 'arrow-back-circle-sharp'
                  : 'information-circle-sharp'
              }
            ></ion-icon>
          </div>
          <div className="slide-out-part">
            {checkPage('/info') ? 'Назад' : 'Информация'}
          </div>
        </a>
        <div className="brand" href="/">
          PREDKI.IO
        </div>
      </div>
      <div className="darker"></div>
    </div>
  );
};
