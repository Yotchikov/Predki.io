import React, { useCallback } from 'react';
import { SelectDate } from '../components/SelectDate';

export const Add = ({ history }) => {
  const handleAdd = useCallback(
    async event => {
      event.preventDefault();
      try {
        console.log('User added');
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  return (
    <div className="form-wrapper">
      <form className="add" onSubmit={handleAdd}>
        <div className="form-row">
          <div className="col form-group">
            <label htmlFor="lastName">Фамилия</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="form-control"
              placeholder="Иванов"
            />
          </div>
          <div className="col form-group">
            <label htmlFor="firstName">Имя</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form-control"
              placeholder="Иван"
            />
          </div>
          <div className="col form-group">
            <label htmlFor="secondName">Отчество</label>
            <input
              type="text"
              name="secondName"
              id="secondName"
              className="form-control"
              placeholder="Иванович"
            />
          </div>
        </div>
        <SelectDate />

      </form>
    </div>
  );
};
