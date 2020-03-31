import React, { useEffect } from 'react';
import ScrollBooster from 'scrollbooster';
import { PersonCard } from './PersonCard';
import '../style/tree.scss';

export const Tree = ({ people, families }) => {
  const drawenFamilies = [];

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

  const treeLayout = family => {
    const familyData = family.data();

    drawenFamilies.push(family.id);

    const husbandTreeBranch =
      familyData.husbandFamily &&
      drawenFamilies.indexOf(familyData.husbandFamily) === -1
        ? treeLayout(findById(familyData.husbandFamily))
        : null;
    const wifeTreeBranch =
      familyData.wifeFamily &&
      drawenFamilies.indexOf(familyData.wifeFamily) === -1
        ? treeLayout(findById(familyData.wifeFamily))
        : null;

    if (husbandTreeBranch && wifeTreeBranch) {
      return (
        <div className="tree-row">
          {husbandTreeBranch}
          {wifeTreeBranch}
        </div>
      );
    }

    if (husbandTreeBranch && !wifeTreeBranch) {
      return <>{husbandTreeBranch}</>;
    }

    if (!husbandTreeBranch && wifeTreeBranch) {
      return <>{wifeTreeBranch}</>;
    }

    return (
      <div className="tree-branch">
        <div className="tree-row">
          <PersonCard person={findById(familyData.husband).data()} />
          <PersonCard person={findById(familyData.wife).data()} />
        </div>
        <div className="tree-row">
          {familyData.children.map(child =>
            child.startsWith('_') ? (
              treeLayout(findById(child))
            ) : (
              <PersonCard person={findById(child).data()} />
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="tree-container">
      <div className="tree">{treeLayout(families.docs[0])}</div>
    </div>
  );
};
