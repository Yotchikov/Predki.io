import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/Auth';
import ScrollBooster from 'scrollbooster';
import { PersonCard } from './PersonCard';
import app from '../base';
import '../style/tree.scss';
import { Loading } from '../pages/Loading';

export const Tree = () => {
  const [people, setPeople] = useState(null);
  const { currentUser } = useContext(AuthContext);

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      const db = app.firestore();
      const data = await db
        .collection('users')
        .doc(currentUser.uid)
        .collection('people')
        .get();
      setPeople(data.docs.map(doc => doc.data()));
    };
    
    fetchData();
  }, []);

  // Running ScrollBooster
  useEffect(() => {
    if (people) {
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
    }
  }, [people]);

  const treeLayout = () => {
    if (people && people.length > 0) {
      return people.map(person => <PersonCard person={person} />);
    } else {
      return <Loading />;
    }
  };

  return (
    <div className="tree-container">
      <div className="tree">
        <div className="tree-row">{treeLayout()}</div>
      </div>
    </div>
  );
};
