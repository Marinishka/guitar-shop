import React from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '../../const';
import BasketForm from '../basket-form/basket-form';

function Basket() {
  return <>
    <h2 className="basket__page-title">Корзина</h2>
    <ul className="bread-crumbs">
      <li className="bread-crumbs__item">
        <a className="bread-crumbs__link" href="#">Главная</a>
      </li>
      <li className="bread-crumbs__item">
        <Link className="bread-crumbs__link" to={Routes.CATALOG}>Каталог</Link>
      </li>
      <li className="bread-crumbs__item">
         Оформляем
      </li>
    </ul>
    <BasketForm/>
  </>;
}

export default Basket;
