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

  const treeLayout = family => {
    const husbandTreeBranch = family.husbandFamily
      ? treeLayout(families.doc(family.husbandFamily).data())
      : null;
    const wifeTreeBranch = family.wifeFamily
      ? treeLayout(families.doc(family.wifeFamily).data())
      : null;

    console.log(family);
    console.log(people);

    return (
      <div className="tree-branch">
        <div className="tree-row">
          <PersonCard person={people.docs.filter(doc => doc.id === family.husband)[0].data()} />
          <PersonCard person={people.docs.filter(doc => doc.id === family.wife)[0].data()} />
        </div>
        <div className="tree-row">
          {family.children.map(child =>
            child.startsWith('_') ? (
              treeLayout(families.doc(child).data())
            ) : (
              <PersonCard person={people.doc(child).data()} />
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
