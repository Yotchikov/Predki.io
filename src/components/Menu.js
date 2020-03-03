import React from 'react';
import app from '../base';
import '../style/menu.scss';

export const Menu = () => {
  return (
    <div>
      <div className="menu">
        <a href="/add">
          <div className="fixed-part">
            <ion-icon name="add-circle"></ion-icon>
          </div>
          <div className="slide-out-part">Добавить человека</div>
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
        <a href="/info">
          <div className="fixed-part">
            <ion-icon name="information-circle-sharp"></ion-icon>
          </div>
          <div className="slide-out-part">Информация</div>
        </a>
        <div className="brand" href="/" onselectstart="return false">
          PREDKI.IO
        </div>
      </div>
      <div className="darker"></div>
    </div>
  );
};
