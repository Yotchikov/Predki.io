import * as firebase from 'firebase';
import app from './base';

const remove = async (personId, currentUserId) => {
  const db = app.firestore();
  const people = await db
    .collection('users')
    .doc(currentUserId)
    .collection('people');
  const families = await db
    .collection('users')
    .doc(currentUserId)
    .collection('families');

  try {
    // Найдем семью, у которой данный person - ребенок
    const familyWithPersonChild = await families
      .where('children', 'array-contains', personId)
      .get();

    // Если он есть в качестве ребенка у кого-то, просто удалим его из архива
    if (!familyWithPersonChild.empty) {
      await families.doc(familyWithPersonChild.docs[0].id).update({
        children: firebase.firestore.FieldValue.arrayRemove(personId),
      });
      await people.doc(personId).delete();
    }
    // Иначе будем работать с его семьей
    else {
      const personSex = (await people.doc(personId).get()).data().sex;

      // Найдем его семью
      const familyDoc = (
        await families
          .where(personSex === 'Мужской' ? 'husband' : 'wife', '==', personId)
          .get()
      ).docs[0];

      // Если там есть второй супруг, просто удалим person-а, если нет связи с его родительской семьей
      if (familyDoc.data()[personSex === 'Мужской' ? 'wife' : 'husband']) {
        // Если есть связь с родительской семьей
        if (
          familyDoc.data()[
            personSex === 'Мужской' ? 'husbandFamily' : 'wifeFamily'
          ]
        ) {
          alert('Удаление человека невозможно: разрыв родственных связей');
        } else {
          // Удаляем из нашей семьи person-а
          await families.doc(familyDoc.id).update({
            [personSex === 'Мужской'
              ? 'husband'
              : 'wife']: firebase.firestore.FieldValue.delete(),
            [personSex === 'Мужской'
              ? 'husbandFamily'
              : 'wifeFamily']: firebase.firestore.FieldValue.delete(),
          });

          // Удаляем person-а
          await people.doc(personId).delete();
        }
      }
      // Если второго супруга нет
      else {
        // Если еще есть дети и родители
        if (
          familyDoc.data()[
            personSex === 'Мужской' ? 'husbandFamily' : 'wifeFamily'
          ] &&
          familyDoc.data().children &&
          familyDoc.data().children.length !== 0
        ) {
          alert('Удаление человека невозможно: разрыв родственных связей');
        }
        // Если нет детей или родителей
        else {
          // Удаляем ссылку на нашу семью из родительской семьи, если она есть
          if (
            familyDoc.data()[
              personSex === 'Мужской' ? 'husbandFamily' : 'wifeFamily'
            ]
          ) {
            await families
              .doc(
                familyDoc.data()[
                  personSex === 'Мужской' ? 'husbandFamily' : 'wifeFamily'
                ]
              )
              .update({
                children: firebase.firestore.FieldValue.arrayRemove(
                  familyDoc.id
                ),
              });
          }
          // Иначе, если есть дети
          else {
            // Если их больше одного, т.е. окажутся оторванные братья/сестры
            if (familyDoc.data().children.length !== 1) {
              alert('Удаление человека невозможно: разрыв родственных связей');
            }
            // Если ребенок один
            else {
              // Если у него есть семья, удалим ему ссылку на родителей
              if (familyDoc.data().children[0].startsWith('_')) {
                await families.doc(familyDoc.data().children[0]).update({
                  [(
                    await families.doc(familyDoc.data().children[0]).get()
                  ).data().husbandFamily === familyDoc.id
                    ? 'husbandFamily'
                    : 'wifeFamily']: firebase.firestore.FieldValue.delete(),
                });
              }
              // Иначе создадим новую семью с ним
              else {
                const newFamilyId = '_' + families.doc().id;
                families.doc(newFamilyId).set({
                  [(await people.doc(familyDoc.data().children[0]).get()).data()
                    .sex === 'Мужской'
                    ? 'husband'
                    : 'wife']: familyDoc.data().children[0],
                  children: [],
                });
              }
            }
          }

          // Удаляем нашу семью и person-а
          await families.doc(familyDoc.id).delete();
          await people.doc(personId).delete();
        }
      }
    }
  } catch (error) {
    alert(error);
  }
};

export default remove;
