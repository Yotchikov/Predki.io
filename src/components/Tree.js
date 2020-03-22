import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/Auth';
import ScrollBooster from 'scrollbooster';
import { PersonCard } from './PersonCard';
import app from '../base';
import '../style/tree.scss';

export const Tree = () => {
  useEffect(() => {
    const viewport = document.querySelector('.tree-container');
    const content = document.querySelector('.tree');

    new ScrollBooster({
      viewport,
      content,
      onUpdate: state => {
        content.style.transform = `translate(
            ${-state.position.x}px,
            ${-state.position.y}px
          )`;
      }
    });
  }, []);

  const { currentUser } = useContext(AuthContext);
  const db = app.firestore();

  const user = db
    .collection('users')
    .doc(currentUser.uid)
    .get()
    .then(doc => {
      console.log(doc.data());
    })
    .catch(error => {});

  console.log(user);

  return (
    <div className="tree-container" onselectstart="return false">
      <div className="tree">
        <div className="tree-row">
          <PersonCard person={user} />
        </div>
      </div>
    </div>
  );
};
