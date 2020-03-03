import React from 'react';
import '../style/forms.scss';

export const SignUp = () => {
  return (
    <div class="form-wrapper">
      <form class="signup" autoComplete="off">
        <div class="form-row">
          <div class="col form-group">
            <label for="inputEmail">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              placeholder="you@email.com"
              required
            />
          </div>
          <div class="col form-group">
            <label for="inputPassword">Пароль</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="********"
              required
            />
          </div>
          <div class="col form-group">
            <label for="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              placeholder="********"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col form-group">
            <label for="inputSurname">Фамилия</label>
            <input
              type="text"
              class="form-control"
              id="inputSurname"
              placeholder="Иванов"
              required
            />
          </div>
          <div class="col form-group">
            <label for="inputName">Имя</label>
            <input
              type="text"
              class="form-control"
              id="inputName"
              placeholder="Иван"
              required
            />
          </div>
          <div class="col form-group">
            <label for="inputSecondName">Отчество</label>
            <input
              type="text"
              class="form-control"
              id="inputSecondName"
              placeholder="Иванович"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-6 form-group">
            <label for="inputDate">Дата рождения</label>
            <div class="form-row">
              <div class="col">
                <select class="form-control" required>
                  <option value="" selected disabled>
                    День
                  </option>
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
              <div class="col">
                <select class="form-control" required>
                  <option value="" disabled selected>
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
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Год"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col-4 form-group">
            <label for="nativeCity">Место рождения</label>
            <input
              type="text"
              class="form-control"
              id="nativeCity"
              placeholder="Город"
              required
            />
          </div>
          <div class="col-2 form-group">
            <label for="sex">Пол</label>
            <ul class="sex-choose">
              <li>
                <input type="radio" value="0" name="sex" id="male" checked />
                <label class="form-check-label" for="male">
                  <i class="fa fa-mars" aria-hidden="true"></i>
                </label>
              </li>
              <li>
                <input type="radio" value="1" name="sex" id="female" />
                <label class="form-check-label" for="female">
                  <i class="fa fa-venus" aria-hidden="true"></i>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-3">
          <button type="submit" class="btn btn-submit">
            Регистрирация
          </button>
          <small class="ml-3">
            <a class="hint" href="/login">
              Уже есть аккаунт?
            </a>
          </small>
        </div>
      </form>
    </div>
  );
};
