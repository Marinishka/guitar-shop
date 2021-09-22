import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Routes} from '../../const';
import BasketForm from '../basket-form/basket-form';

function Basket({onSetPopupOpen}) {
  const guitarsInBasket = useSelector((state) => state.LOCAL.guitarsInBasket);

  const getBasketForm = () => {
    if (guitarsInBasket.length === 0) {
      return <div className="basket">Ваша корзина пуста. Добавьте сюда что-нибудь из нашего <Link className="bread-crumbs__link" to={Routes.CATALOG}>каталога</Link>.</div>;
    } else {
      return <BasketForm onSetPopupOpen={onSetPopupOpen}/>;
    }
  };

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
    {getBasketForm()}
  </>;
}

Basket.propTypes = {
  onSetPopupOpen: PropTypes.func.isRequired
};

export default Basket;
