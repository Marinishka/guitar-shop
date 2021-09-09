import React from 'react';

function Sort() {
  return <div className="sort">
    <span className="sort__title">Сортировать:</span>
    <ul className="sort__list">
      <li className="sort__item">
        <button className="sort__btn-type sort__btn-type--active">по цене</button>
      </li>
      <li className="sort__item">
        <button className="sort__btn-type">по популярности</button>
      </li>
    </ul>
    <div className="sort__direction">
      <button className="sort__btn-direction sort__btn-direction--ascending sort__btn-direction--active" aria-label="по возрастанию"></button>
      <button className="sort__btn-direction sort__btn-direction--descending" aria-label="по убыванию"></button>
    </div>
  </div>;
}

export default Sort;
