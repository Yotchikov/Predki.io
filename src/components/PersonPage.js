import React from 'react';

export const PersonPage = ({ person, clickOutside }) => {
  const personData = person.data();

  return (
    <div class="person-page-container" onClick={clickOutside}>
      <div className="person-page">
        <h2>
          {personData.firstName +
            ' ' +
            personData.secondName +
            ' ' +
            personData.lastName}
        </h2>
      </div>
    </div>
  );
};
