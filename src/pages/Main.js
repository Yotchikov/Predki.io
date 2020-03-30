import React, { useState, useContext, useEffect } from 'react';
import { Tree } from '../components/Tree';
import app from '../base';
import { AuthContext } from '../context/Auth';
import { Loading } from '../pages/Loading';

export const Main = () => {
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
  }, [currentUser.uid]);

  if (people && people.length > 0) {
    return <Tree people={people} />;
  } else {
    return <Loading />;
  }
};
