import React, { useState } from 'react';

const oddMonths = [
  'Января',
  'Марта',
  'Мая',
  'Июля',
  'Августа',
  'Октября',
  'Декабря'
];
const evenMonths = ['Апреля', 'Июня', 'Сентября', 'Ноября'];

export const SelectDate = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [dayOptions, setDayOptions] = useState(
    [...Array(31).keys()].map(i => <option key={i + 1}>{i + 1}</option>)
  );

  const handleChange = event => {
    switch (event.target.name) {
      case 'day':
        setDay(event.target.value);
        console.log(event.target.value);
        break;
      case 'month':
        setMonth(event.target.value);
        console.log(month);
        if (event.target.value == 'Февраля') {
          setDayOptions(
            [...Array(29).keys()].map(i => <option key={i + 1}>{i + 1}</option>)
          );
        } else if (oddMonths.includes(event.target.value)) {
          setDayOptions(
            [...Array(31).keys()].map(i => <option key={i + 1}>{i + 1}</option>)
          );
        } else if (evenMonths.includes(event.target.value)) {
          setDayOptions(
            [...Array(30).keys()].map(i => <option key={i + 1}>{i + 1}</option>)
          );
        }
        break;
      case 'year':
        const re = /^[0-9\b]+$/;

        if (
          (event.target.value === '' || re.test(event.target.value)) &&
          event.target.value >= 0 &&
          event.target.value <= 2020
        ) {
          setYear(event.target.value);
        }
        break;
      default:
        throw Error;
    }
  };

  return (
    <div className="form-row">
      <div className="col">
        <select
          defaultValue=""
          className="form-control"
          onChange={handleChange}
          name="day"
          id="day"
          required
        >
          <option value="" disabled>
            День
          </option>
          {dayOptions}
        </select>
      </div>
      <div className="col">
        <select
          defaultValue=""
          className="form-control"
          onChange={handleChange}
          name="month"
          id="month"
          required
        >
          <option value="" disabled>
            Месяц
          </option>
          <option>Января</option>
          <option>Февраля</option>
          <option>Марта</option>
          <option>Апреля</option>
          <option>Мая</option>
          <option>Июня</option>
          <option>Июля</option>
          <option>Августа</option>
          <option>Сентября</option>
          <option>Октября</option>
          <option>Ноября</option>
          <option>Декабря</option>
        </select>
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Год"
          name="year"
          id="year"
          value={year}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};
