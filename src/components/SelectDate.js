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

export const SelectDate = ({ personDay, personMonth, personYear, required, typeOfDate }) => {
  const [day, setDay] = useState(personDay);
  const [month, setMonth] = useState(personMonth);
  const [year, setYear] = useState(personYear);

  const [dayOptions, setDayOptions] = useState(
    [...Array(31).keys()].map(i => <option key={i + 1}>{i + 1}</option>)
  );

  const [daySelectStyle, setDaySelectStyle] = useState({
    color: '#6c757d'
  });
  const [monthSelectStyle, setMonthSelectStyle] = useState({
    color: '#6c757d'
  });

  const handleChange = event => {
    switch (event.target.name) {
      case typeOfDate + 'day':
        setDay(event.target.value);
        setDaySelectStyle({
          color: '#d0d7e1'
        });
        break;
      case typeOfDate + 'month':
        setMonth(event.target.value);
        setMonthSelectStyle({
          color: '#d0d7e1'
        });
        if (event.target.value === 'Февраля') {
          setDayOptions(
            [...Array(29).keys()].map(i => <option key={i + 1}>{i + 1}</option>)
          );
          if (day > 29) {
            setDay(1);
          }
        } else if (oddMonths.includes(event.target.value)) {
          setDayOptions(
            [...Array(31).keys()].map(i => <option key={i + 1}>{i + 1}</option>)
          );
        } else if (evenMonths.includes(event.target.value)) {
          setDayOptions(
            [...Array(30).keys()].map(i => <option key={i + 1}>{i + 1}</option>)
          );
          if (day > 30) {
            setDay(1);
          }
        }
        break;
      case typeOfDate + 'year':
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
          className="form-control"
          onChange={handleChange}
          name={typeOfDate + 'day'}
          style={daySelectStyle}
          value={day}
          required={required}
        >
          <option value="" hidden disabled>
            День
          </option>
          {dayOptions}
        </select>
      </div>
      <div className="col">
        <select
          className="form-control"
          onChange={handleChange}
          name={typeOfDate + 'month'}
          style={monthSelectStyle}
          value={month}
          required={required}
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
          name={typeOfDate + 'year'}
          id="year"
          value={year}
          onChange={handleChange}
          required={required}
        />
      </div>
    </div>
  );
};
