import React, { useState, useContext, useEffect } from 'react';
import { Tree } from '../components/Tree';
import app from '../base';
import { AuthContext } from '../context/Auth';
import { Loading } from '../pages/Loading';

export const Main = () => {
  const [people, setPeople] = useState(null);
  const [families, setFamilies] = useState(null);
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

      setPeople(peopleDocs.docs);
      setFamilies(familiesDocs.docs);
    };

    fetchData();
  }, [currentUser.uid]);

  if (people) {
    return <Tree people={people} />;
  } else {
    return <Loading />;
  }
};
