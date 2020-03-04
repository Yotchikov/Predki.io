import React from 'react';

export const Loading = () => {
  return (
    <div class="position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};
