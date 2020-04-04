import React, { useEffect } from 'react';
import ScrollBooster from 'scrollbooster';
import { PersonCard } from './PersonCard';
import '../style/tree.scss';
import { useState } from 'react';

export const Tree = ({ people, families, candidate, sendRelative }) => {
  const Family = (family, depth) => {
    const familyData = family.data();

    if (candidate) {
      return (
        <div id={family.id} className="family">
          <div className="tree-row">
            {familyData.husband ? (
              <PersonCard
                person={findById(familyData.husband)}
                handlePersonSelection={handlePersonSelection}
                selected={selectedPersonId === familyData.husband}
                bannedRoles={[
                  true,
                  !familyData.wife && candidate.sex === 'Женский',
                  familyData.husbandFamily
                    ? candidate.sex === 'Мужской'
                      ? !findById(familyData.husbandFamily).data().husband
                      : !findById(familyData.husbandFamily).data().wife
                    : true
                ]}
              />
            ) : null}
            {familyData.wife ? (
              <PersonCard
                person={findById(familyData.wife)}
                handlePersonSelection={handlePersonSelection}
                selected={selectedPersonId === familyData.wife}
                bannedRoles={[
                  true,
                  !familyData.husband && candidate.sex === 'Мужской',
                  familyData.wifeFamily
                    ? candidate.sex === 'Мужской'
                      ? !findById(familyData.wifeFamily).data().husband
                      : !findById(familyData.wifeFamily).data().wife
                    : true
                ]}
              />
            ) : null}
          </div>
          <div className="tree-row">
            {familyData.children.map(child =>
              child.startsWith('_') ? (
                familyLayout(findById(child), depth + 1, family.id)
              ) : (
                <PersonCard
                  person={findById(child)}
                  handlePersonSelection={handlePersonSelection}
                  selected={selectedPersonId === child}
                  bannedRoles={[
                    true,
                    candidate.sex !== findById(child).data().sex,
                    candidate.sex === 'Мужской'
                      ? !familyData.husband
                      : !familyData.wife
                  ]}
                />
              )
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div id={family.id} className="family">
          <div className="tree-row">
            {familyData.husband ? (
              <PersonCard person={findById(familyData.husband)} />
            ) : null}
            {familyData.wife ? (
              <PersonCard person={findById(familyData.wife)} />
            ) : null}
          </div>
          <div className="tree-row">
            {familyData.children.map(child =>
              child.startsWith('_') ? (
                familyLayout(findById(child), depth + 1, family.id)
              ) : (
                <PersonCard person={findById(child)} />
              )
            )}
          </div>
        </div>
      );
    }
  };

  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedRelationship, setSelectedRelationship] = useState(null);

  const drawenFamilies = [];
  const familiesToRender = [];
  const depths = [];

  // Running ScrollBooster
  useEffect(() => {
    const viewport = document.querySelector('.tree-container');
    const content = document.querySelector('.tree');
    const sb = new ScrollBooster({
      viewport,
      content,
      emulateScroll: true,
      onUpdate: state => {
        content.style.transform = `translate(
            ${-state.position.x}px,
            ${-state.position.y}px
          )`;
      }
    });
  }, []);

  const handlePersonSelection = sendRelative
    ? (id, relationship) => {
        if (id !== selectedPersonId) {
          setSelectedPersonId(id);
        }
        if (relationship !== selectedRelationship) {
          setSelectedRelationship(relationship);
        }
      }
    : null;

  const handleClick = sendRelative
    ? () => {
        if (selectedPersonId) {
          sendRelative(selectedPersonId, selectedRelationship);
        }
      }
    : null;

  const findById = id => {
    if (id.startsWith('_')) {
      return families.docs.find((element, index, array) => element.id === id);
    } else {
      return people.docs.find((element, index, array) => element.id === id);
    }
  };

  const familyLayout = (family, depth, parentsId = null) => {
    const familyData = family.data();

    drawenFamilies.push(family.id);

    // Если родителей нет, мы добрались до вершины ветки - сохраняем глубину
    if (!familyData.husbandFamily && !familyData.wifeFamily) {
      depths.push(depth);
    }

    // Если обеих родительских веток нет или есть одна и она отрисована
    if (
      (!familyData.husbandFamily && !familyData.wifeFamily) ||
      (familyData.husbandFamily &&
        !familyData.wifeFamily &&
        drawenFamilies.indexOf(familyData.husbandFamily) !== -1) ||
      (familyData.wifeFamily &&
        !familyData.husbandFamily &&
        drawenFamilies.indexOf(familyData.wifeFamily) !== -1)
    ) {
      return Family(family, depth);
    }

    // Есть только мужская родительская ветка и она еще не отрисована
    if (
      familyData.husbandFamily &&
      !familyData.wifeFamily &&
      drawenFamilies.indexOf(familyData.husbandFamily) === -1
    ) {
      return familyLayout(findById(familyData.husbandFamily), depth - 1);
    }

    // Есть только женская родительская ветка и она еще не отрисована
    if (
      familyData.wifeFamily &&
      !familyData.husbandFamily &&
      drawenFamilies.indexOf(familyData.wifeFamily) === -1
    ) {
      return familyLayout(findById(familyData.wifeFamily), depth - 1);
    }

    // Есть обе родительские ветки и они обе не отрисованы
    if (
      familyData.husbandFamily &&
      familyData.wifeFamily &&
      drawenFamilies.indexOf(familyData.husbandFamily) === -1 &&
      drawenFamilies.indexOf(familyData.wifeFamily) === -1
    ) {
      return familyLayout(findById(familyData.husbandFamily), depth - 1);
    }

    // Есть обе родительские ветки и мужская уже отрисована
    if (
      familyData.husbandFamily &&
      familyData.wifeFamily &&
      drawenFamilies.indexOf(familyData.husbandFamily) !== -1 &&
      drawenFamilies.indexOf(familyData.wifeFamily) === -1
    ) {
      familiesToRender.push([familyData.wifeFamily, depth - 1]);
      return Family(family, depth);
    }

    // Есть обе родительские ветки и женская уже отрисована
    if (
      familyData.husbandFamily &&
      familyData.wifeFamily &&
      drawenFamilies.indexOf(familyData.husbandFamily) === -1 &&
      drawenFamilies.indexOf(familyData.wifeFamily) !== -1
    ) {
      familiesToRender.push([familyData.husbandFamily, depth - 1]);
      return null;
    }

    // Есть обе родительские ветки и они уже отрисованы
    if (
      familyData.husbandFamily &&
      familyData.wifeFamily &&
      drawenFamilies.indexOf(familyData.husbandFamily) !== -1 &&
      drawenFamilies.indexOf(familyData.wifeFamily) !== -1
    ) {
      return familyData.husbandFamily === parentsId
        ? Family(family, depth)
        : null;
    }
  };

  const treeLayout = () => {
    const renderedFamilies = [];

    renderedFamilies.push(familyLayout(families.docs[5], 0));
    while (familiesToRender.length !== 0) {
      renderedFamilies.push(
        familyLayout(findById(familiesToRender[0][0]), familiesToRender[0][1])
      );
      familiesToRender.shift();
    }

    const maxDepth = Math.min(...depths);

    return renderedFamilies.map((fam, i) => (
      <div style={{ marginTop: 305 * (depths[i] - maxDepth) + 'px' }}>
        {fam}
      </div>
    ));
  };

  return (
    <>
      {candidate ? (
        <div className="position-absolute w-100 mt-3 d-flex justify-content-center">
          <div className="message">
            <div>Отметьте ближайшего родственника</div>
            <button
              className="btn ml-3 btn-submit"
              onClick={handleClick}
              disabled={!selectedPersonId}
            >
              Добавить
            </button>
          </div>
        </div>
      ) : null}

      <div className="tree-container">
        <div className="tree">{treeLayout()}</div>
      </div>
    </>
  );
};
