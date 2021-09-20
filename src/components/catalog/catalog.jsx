import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../filter/filter';
import Goods from '../goods/goods';

function Catalog({setPopupOpen}) {
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
      <Goods setPopupOpen={setPopupOpen}/>
    </div>
  </>;
}

Catalog.propTypes = {
  setPopupOpen: PropTypes.func.isRequired
};

export default Catalog;
