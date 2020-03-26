import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/Auth';
import ScrollBooster from 'scrollbooster';
import { PersonCard } from './PersonCard';
import app from '../base';
import '../style/tree.scss';

export const Tree = () => {
  const { people, setPeople } = useState(null);
  const { currentUser } = useContext(AuthContext);
  const db = app.firestore();

  const users = db
    .collection('users')
    .doc(currentUser.uid)
    .get()
    .then(doc => {
      setPeople(doc.data);
      console.log(people);
    })
    .catch(error => {});

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

  return (
    <div className="tree-container">
      <div className="tree">
        <div className="tree-row">
          <PersonCard person={people[0]} />
        </div>
      </div>
    </div>
  );
};
