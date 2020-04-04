import React, { useState, useContext, useEffect } from 'react';
import { Tree } from '../components/Tree';
import app from '../base';
import { AuthContext } from '../context/Auth';
import { Loading } from '../pages/Loading';

export const Main = ({newPerson}) => {
  const [people, setPeople] = useState(null);
  const [families, setFamilies] = useState(null);
  const [relative, setRelative] = useState(null);
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

  const getRelative = newPerson ? (id, relationship) => {
    console.log('hi');
  } : null;

  if (people && families) {
    return (
      <Tree people={people} families={families} candidate={newPerson} sendRelative={getRelative} />
    );
  } else {
    return <Loading />;
  }
};
