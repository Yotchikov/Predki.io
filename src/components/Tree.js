import React, { useEffect } from 'react';
import ScrollBooster from 'scrollbooster';
import { PersonCard } from './PersonCard';
import '../style/tree.scss';

export const Tree = ({ people, families }) => {
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
    // const husbandTreeBranch = family.husbandFamily
    //   ? treeLayout(families.doc(family.husbandFamily).data())
    //   : null;
    // const wifeTreeBranch = family.wifeFamily
    //   ? treeLayout(families.doc(family.wifeFamily).data())
    //   : null;

    console.log(family.id);

    return (
      <div className="tree-branch">
        <div className="tree-row">
          <PersonCard person={findById(family.husband).data()} />
          <PersonCard person={findById(family.wife).data()} />
        </div>
        <div className="tree-row">
          {family.children.map(child =>
            child.startsWith('_') ? (
              treeLayout(findById(child).data())
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
      <div className="tree">{treeLayout(families.docs[0].data())}</div>
    </div>
  );
};
