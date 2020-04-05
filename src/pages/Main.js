import React, { useState, useContext, useEffect } from 'react';
import { Tree } from '../components/Tree';
import app from '../base';
import { AuthContext } from '../context/Auth';
import { Loading } from '../pages/Loading';
import * as firebase from 'firebase';
import { useHistory } from 'react-router-dom';

export const Main = ({ newPerson }) => {
  const [people, setPeople] = useState(null);
  const [families, setFamilies] = useState(null);
  const history =useHistory();
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

  const addToTree = newPerson
    ? async (id, relationship) => {
        try {
          const db = app.firestore();

          // Родственник
          const relative = await db
            .collection('users')
            .doc(currentUser.uid)
            .collection('people')
            .doc(id)
            .get();

          // Сохраним id нового человека
          const newPersonId = db
            .collection('users')
            .doc(currentUser.uid)
            .collection('people')
            .doc().id;

          // Добавим нового человека в коллекцию people
          await db
            .collection('users')
            .doc(currentUser.uid)
            .collection('people')
            .doc(newPersonId)
            .set(newPerson);

          switch (relationship) {
            case 'parent': {
              // Ищем, в какую семью будем добавлять нового ребенка
              const familyDoc = await db
                .collection('users')
                .doc(currentUser.uid)
                .collection('families')
                .where(
                  relative.data().sex === 'Мужской' ? 'husband' : 'wife',
                  '==',
                  id
                )
                .get();

              if (familyDoc.empty) {
                // Создаем id новой семьи
                const newFamilyId =
                  '_' +
                  db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('families')
                    .doc().id;

                // Найдем семью бабушки и дедушки
                const parentFamily = await db
                  .collection('users')
                  .doc(currentUser.uid)
                  .collection('families')
                  .where('children', 'array-contains', id)
                  .get();

                // Если такая семья есть
                if (!parentFamily.empty) {
                  // Заменим им в архиве детей ссылку на ребенка на ссылку на новую создаваемую семью
                  await db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('families')
                    .doc(parentFamily.docs[0].id)
                    .update({
                      children: firebase.firestore.FieldValue.arrayUnion(
                        newFamilyId
                      )
                    });
                  await db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('families')
                    .doc(parentFamily.docs[0].id)
                    .update({
                      children: firebase.firestore.FieldValue.arrayRemove(id)
                    });
                }

                // Создадим новую семью
                await db
                  .collection('users')
                  .doc(currentUser.uid)
                  .collection('families')
                  .doc(newFamilyId)
                  .set({
                    [relative.data().sex === 'Мужской'
                      ? 'husband'
                      : 'wife']: id,
                    children: [newPersonId],
                    [relative.data().sex === 'Мужской'
                      ? 'husbandFamily'
                      : 'wifeFamily']: parentFamily.empty
                      ? null
                      : parentFamily.docs[0].id
                  });
              } else {
                // Иначе в уже готовую семью добавим нового ребенка
                await db
                  .collection('users')
                  .doc(currentUser.uid)
                  .collection('families')
                  .doc(familyDoc.docs[0].id)
                  .update({
                    children: firebase.firestore.FieldValue.arrayUnion(
                      newPersonId
                    )
                  });
              }
              break;
            }
            case 'spouse': {
              // Ищем, в какую семью будем добавлять нового супруга
              const familyDoc = await db
                .collection('users')
                .doc(currentUser.uid)
                .collection('families')
                .where(
                  relative.data().sex === 'Мужской' ? 'husband' : 'wife',
                  '==',
                  id
                )
                .get();

              if (familyDoc.empty) {
                // Создаем id новой семьи
                const newFamilyId =
                  '_' +
                  db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('families')
                    .doc().id;

                // Найдем семью тестя и тещи
                const parentFamily = await db
                  .collection('users')
                  .doc(currentUser.uid)
                  .collection('families')
                  .where('children', 'array-contains', id)
                  .get();

                // Если такая семья есть
                if (!parentFamily.empty) {
                  // Заменим им в архиве детей ссылку на ребенка на ссылку на новую создаваемую семью
                  await db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('families')
                    .doc(parentFamily.docs[0].id)
                    .update({
                      children: firebase.firestore.FieldValue.arrayUnion(
                        newFamilyId
                      )
                    });
                  await db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('families')
                    .doc(parentFamily.docs[0].id)
                    .update({
                      children: firebase.firestore.FieldValue.arrayRemove(id)
                    });
                }

                // Создадим новую семью
                await db
                  .collection('users')
                  .doc(currentUser.uid)
                  .collection('families')
                  .doc(newFamilyId)
                  .set({
                    [relative.data().sex === 'Мужской'
                      ? 'husband'
                      : 'wife']: id,
                    [newPerson.sex === 'Мужской'
                      ? 'husband'
                      : 'wife']: newPersonId,
                    [relative.data().sex === 'Мужской'
                      ? 'husbandFamily'
                      : 'wifeFamily']: parentFamily.empty
                      ? null
                      : parentFamily.docs[0].id,
                    children: []
                  });
              } else {
                // Иначе в уже готовую семью добавим нового ребенка
                await db
                  .collection('users')
                  .doc(currentUser.uid)
                  .collection('families')
                  .doc(familyDoc.docs[0].id)
                  .update({
                    [newPerson.sex === 'Мужской'
                      ? 'husband'
                      : 'wife']: newPersonId
                  });
              }
              break;
            }
          }

          history.push('/');
        } catch (error) {
          alert(error);
        }
      }
    : null;

  if (people && families) {
    return (
      <Tree
        people={people}
        families={families}
        candidate={newPerson}
        sendRelative={addToTree}
      />
    );
  } else {
    return <Loading />;
  }
};
