import React, { useEffect } from 'react';
import ScrollBooster from 'scrollbooster';
import { PersonCard } from './PersonCard';
import '../style/tree.scss';

export const Tree = () => {
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

  return (
    <div className="tree-container" onselectstart="return false">
      <div className="tree">
        <div className="tree-row">
          <PersonCard />
          <PersonCard />
        </div>
      </div>
    </div>
  );
};
