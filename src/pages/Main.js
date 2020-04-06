import React, { useState, useContext, useEffect } from 'react';
import { Tree } from '../components/Tree';
import app from '../base';
import { AuthContext } from '../context/Auth';
import { Loading } from '../pages/Loading';
import { useHistory } from 'react-router-dom';
import add from '../addMethod';

export const Main = ({ returnFunction, newPerson }) => {
  const [people, setPeople] = useState(null);
  const [families, setFamilies] = useState(null);
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      const db = app.firestore();
      const peopleDocs = await db
        .collection('users')
        .doc(currentUser.uid)
        .collection('people')
        .get();
      const familiesDocs = await db
        .collection('users')
        .doc(currentUser.uid)
        .collection('families')
        .get();

      setPeople(peopleDocs);
      setFamilies(familiesDocs);
    };

    fetchData();
  }, [currentUser.uid]);

  // Adding to tree
  const addToTree = newPerson
    ? async (id, relationship) => {
        const db = app.firestore();
        await add(
          newPerson,
          id,
          relationship,
          db.collection('users').doc(currentUser.uid).collection('people'),
          db.collection('users').doc(currentUser.uid).collection('families')
        );

        history.push('/');
      }
    : null;

  if (people && families) {
    return (
      <Tree
        people={people}
        families={families}
        candidate={newPerson}
        sendRelative={addToTree}
        returnFunction={returnFunction}
      />
    );
  } else {
    return <Loading />;
  }
};
