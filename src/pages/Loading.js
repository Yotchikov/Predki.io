import React from 'react';

export const Loading = () => {
  return (
    <div className="position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
