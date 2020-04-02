import React, { useEffect } from 'react';
import ScrollBooster from 'scrollbooster';
import { PersonCard } from './PersonCard';
import '../style/tree.scss';

export const Tree = ({ people, families }) => {
  const drawenFamilies = [];
  const familiesToRender = [];
  const depths = [];

  // Running ScrollBooster
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
      return (
        <div id={family.id} className="family">
          <div className="tree-row">
            <PersonCard person={findById(familyData.husband).data()} />
            <PersonCard person={findById(familyData.wife).data()} />
          </div>
          <div className="tree-row">
            {familyData.children.map(child =>
              child.startsWith('_') ? (
                familyLayout(findById(child), depth + 1, family.id)
              ) : (
                <PersonCard person={findById(child).data()} />
              )
            )}
          </div>
        </div>
      );
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
      return (
        <div id={family.id} className="family">
          <div className="tree-row">
            <PersonCard person={findById(familyData.husband).data()} />
            <PersonCard person={findById(familyData.wife).data()} />
          </div>
          <div className="tree-row">
            {familyData.children.map(child =>
              child.startsWith('_') ? (
                familyLayout(findById(child), depth + 1, family.id)
              ) : (
                <PersonCard person={findById(child).data()} />
              )
            )}
          </div>
        </div>
      );
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
      return familyData.husbandFamily === parentsId ? (
        <div id={family.id} className="family">
          <div className="tree-row">
            <PersonCard person={findById(familyData.husband).data()} />
            <PersonCard person={findById(familyData.wife).data()} />
          </div>
          <div className="tree-row">
            {familyData.children.map(child =>
              child.startsWith('_') ? (
                familyLayout(findById(child), depth + 1, family.id)
              ) : (
                <PersonCard person={findById(child).data()} />
              )
            )}
          </div>
        </div>
      ) : null;
    }
  };

  const treeLayout = () => {
    const renderedFamilies = [];

    renderedFamilies.push(familyLayout(families.docs[0], 0));
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
    <div className="tree-container">
      <div className="tree">{treeLayout()}</div>
    </div>
  );
};
