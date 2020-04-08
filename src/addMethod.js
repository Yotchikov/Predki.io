import * as firebase from 'firebase';

const add = async (newPerson, relativeId, relationship, people, families) => {
  // Id для нового человека в БД
  const newPersonId = people.doc().id;
  // Id для новой семьи
  const newFamilyId = '_' + families.doc().id;

  try {
    // Получение необходимых параметров
    const relative = await people.doc(relativeId).get();
    const relativeStatus =
      relative.data().sex === 'Мужской' ? 'husband' : 'wife';
    const newPersonStatus = newPerson.sex === 'Мужской' ? 'husband' : 'wife';
    const relativeParents = relativeStatus + 'Family';
    const relativeHasFamily = await families
      .where(relativeStatus, '==', relativeId)
      .get();
    const relativeFamily = relativeHasFamily.empty
      ? null
      : relativeHasFamily.docs[0];

    // Добавление нового пользователя в БД
    await people.doc(newPersonId).set(newPerson);

    switch (relationship) {
      case 'parent': {
        // Если у родственника еще нет собственной семьи
        if (!relativeFamily) {
          // Заменим указатель на ребенка указателем на новую семью, если у него есть родители
          const parentFamily = await families
            .where('children', 'array-contains', relativeId)
            .get();
          if (!parentFamily.empty) {
            await families.doc(parentFamily.docs[0].id).update({
              children: firebase.firestore.FieldValue.arrayUnion(newFamilyId),
            });
            await families.doc(parentFamily.docs[0].id).update({
              children: firebase.firestore.FieldValue.arrayRemove(relativeId),
            });
          }

          // Создадим новую семью с родителем-relative и ребенком-newPerson
          await families.doc(newFamilyId).set({
            [relativeStatus]: relativeId,
            children: [newPersonId],
            [relativeParents]: parentFamily.empty
              ? null
              : parentFamily.docs[0].id,
          });
        }
        // Если у родственника уже есть собственная семья
        else {
          // Добавим в нее ребенка-newPerson
          await families.doc(relativeFamily.id).update({
            children: firebase.firestore.FieldValue.arrayUnion(newPersonId),
          });
        }
        break;
      }
      case 'spouse': {
        // Если у родственника еще нет собственной семьи
        if (!relativeFamily) {
          // Заменим указатель на ребенка указателем на новую семью, если у него есть родители
          const parentFamily = await families
            .where('children', 'array-contains', relativeId)
            .get();
          if (!parentFamily.empty) {
            await families.doc(parentFamily.docs[0].id).update({
              children: firebase.firestore.FieldValue.arrayUnion(newFamilyId),
            });
            await families.doc(parentFamily.docs[0].id).update({
              children: firebase.firestore.FieldValue.arrayRemove(relativeId),
            });
          }

          // Создадим новую семью с супругом-relative и супругом-newPerson
          await families.doc(newFamilyId).set({
            [relativeStatus]: relativeId,
            [newPersonStatus]: newPersonId,
            [relativeParents]: parentFamily.empty
              ? null
              : parentFamily.docs[0].id,
            children: [],
          });
        }
        // Если у родственника уже есть своя семья
        else {
          await families.doc(relativeFamily.id).update({
            [newPersonStatus]: newPersonId,
          });
        }
        break;
      }
      case 'child': {
        // Если у родственника еще нет собственной семьи, т.е. это ребенок-одиночка
        if (!relativeFamily) {
          // Находим семью его родителя
          const parentFamily = await families
            .where('children', 'array-contains', relativeId)
            .get();

          // Добавляем в эту семью мужа или жену
          await families.doc(parentFamily.docs[0].id).update({
            [newPersonStatus]: newPersonId,
          });
        }
        // Если у родственника уже есть своя семья
        else {
          // Находим родительские семьи (их может быть 2 - с мужской и женской стороны)
          const parentFamilies = await families
            .where('children', 'array-contains', relativeFamily.id)
            .get();

          // Выбираем из них ту, которая относится к нашему relative
          const parentFamily = parentFamilies.docs.find(
            (doc) => doc.id === relativeFamily.data()[relativeParents]
          );

          // Если родительской семьи у relative нет
          if (!parentFamily) {
            // Создаем новую родительскую семью
            await families.doc(newFamilyId).set({
              [newPersonStatus]: newPersonId,
              children: [relativeFamily.id],
            });

            // Обновляем ссылку на родительскую семью в семье ребенка
            await families.doc(relativeFamily.id).update({
              [relativeParents]: newFamilyId,
            });
          }
          // Если у родительская семья у relative уже есть
          else {
            // Обновляем ссылку на мужа/жену в уже имеющейся родительской семье
            await families.doc(parentFamily.id).update({
              [newPersonStatus]: newPersonId,
            });
          }
        }
      }
    }
  } catch (error) {
    people.doc(newPersonId).delete();
    families.doc(newFamilyId).delete();
    alert(error);
  }
};

export default add;
