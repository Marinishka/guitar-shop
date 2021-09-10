import React from 'react';
import Filter from '../filter/filter';
import Sort from '../sort/sort';
import data from '../../data';
import {ORDERS_IN_LIST} from '../../const';
import GoodsPagination from '../goods-pagination/goods-pagination';

function Catalog() {
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
        <GoodsPagination amountPages={amountPages} data={data}/>
      </div>
    </div>
  </>;
}

export default Catalog;
