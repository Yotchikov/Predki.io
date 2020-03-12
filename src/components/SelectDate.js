import React from 'react';

export const SelectDate = () => {
  return (
    <div className="form-row">
      <div className="col">
        <select defaultValue="" className="form-control" required>
          <option value="" disabled>День</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
          <option>21</option>
          <option>22</option>
          <option>23</option>
          <option>24</option>
          <option>25</option>
          <option>26</option>
          <option>27</option>
          <option>28</option>
          <option>29</option>
          <option>30</option>
          <option>31</option>
        </select>
      </div>
      <div className="col">
        <select defaultValue="" className="form-control" required>
          <option value="" disabled>Месяц</option>
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
        <input type="text" className="form-control" placeholder="Год" />
      </div>
    </div>
  );
};
