import React from 'react';

function Filter() {
  return <form className="filter">
    <h3 className="filter__title">Фильтр</h3>
    <fieldset className="filter__fieldset">
      <legend className="filter__legend">Цена, &#8381;</legend>
      <label className="filter__label">
        <input className="filter__input" type="number" min="0" max="" aria-label="Минимальная цена"></input>
      </label>
      <label className="filter__label">
        <input className="filter__input" type="number" min="" max="" aria-label="Максимальная цена"></input>
      </label>
    </fieldset>
    <fieldset className="filter__fieldset">
      <legend className="filter__legend">Тип гитар</legend>
      <label className="filter__checkbox-label" tabIndex="0">
        <input className="filter__checkbox" type="checkbox"></input>
      Акустические гитары
      </label>
      <label className="filter__checkbox-label filter__checkbox-label--active" tabIndex="0">
        <input className="filter__checkbox" type="checkbox"></input>
      Электрогитары
      </label>
      <label className="filter__checkbox-label" tabIndex="0">
        <input className="filter__checkbox" type="checkbox"></input>
        Укулеле
      </label>
    </fieldset>
    <fieldset className="filter__fieldset">
      <legend className="filter__legend">Количество струн</legend>
      <label className="filter__checkbox-label" tabIndex="0">
        <input className="filter__checkbox" type="checkbox"></input>
      4
      </label>
      <label className="filter__checkbox-label" tabIndex="0">
        <input className="filter__checkbox" type="checkbox"></input>
      6
      </label>
      <label className="filter__checkbox-label" tabIndex="0">
        <input className="filter__checkbox" type="checkbox"></input>
        7
      </label>
      <label className="filter__checkbox-label filter__checkbox-label--disable">
        <input className="filter__checkbox" type="checkbox" disabled></input>
        12
      </label>
    </fieldset>
  </form>;
}

export default Filter;
