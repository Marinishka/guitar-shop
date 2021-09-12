import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import data from '../../data';
import {ORDERS_IN_LIST} from '../../const';
import Goods from '../goods/goods';

function Catalog({setPopupOpen}) {
  const amountPages = Math.ceil(data.length / ORDERS_IN_LIST);

  return <>
    <h2 className="catalog__title">Каталог гитар</h2>
    <ul className="bread-crumbs">
      <li className="bread-crumbs__item">
        <a className="bread-crumbs__link" href="#">Главная</a>
      </li>
      <li className="bread-crumbs__item">
        Каталог
      </li>
    </ul>
    <div className="catalog__main">
      <Filter/>
      <div className="catalog__goods">
        <Sort/>
        <Goods amountPages={amountPages} data={data} setPopupOpen={setPopupOpen}/>
      </div>
    </div>
  </>;
}

Catalog.propTypes = {
  setPopupOpen: PropTypes.func.isRequired
};

export default Catalog;
