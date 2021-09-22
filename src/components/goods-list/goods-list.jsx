import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {getNumberWithSpaces} from '../../utils/common';
import {GuitarTypes, ORDERS_IN_LIST} from '../../const';

function GoodsList({activePage, setPopupOpen}) {
  const filteredGuitars = useSelector((state) => state.LOCAL.filteredGuitars);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (activePage === 1) {
      setOrderList(filteredGuitars.slice(0, 9));
    } else {
      setOrderList(filteredGuitars.slice((activePage - 1) * ORDERS_IN_LIST, (activePage - 1) * ORDERS_IN_LIST + ORDERS_IN_LIST));
    }
  }, [activePage, filteredGuitars]);

  const getGoodList = () => {
    return orderList.map((item) => {

      const onBuyClick = (evt) => {
        evt.preventDefault();
        setPopupOpen([`add-item`, item]);
      };

      return <li className="goods-list__item" key={item.art}>
        <article className="good">
          <img className="good__img" src={`./img/${GuitarTypes[item.type][0]}.png`} width="68" height="190" alt={`${item.type} ${item.name}`}></img>
          <div className="good__rating">
            <div className="good__stars">
              <div className="good__star"></div>
              <div className="good__star"></div>
              <div className="good__star"></div>
              <div className="good__star"></div>
              <div className="good__star"></div>
            </div>
            <div className="goods__reviews">{item.reviews}</div>
          </div>
          <div className="good__row">
            <h3 className="good__title">{item.name}</h3>
            <div className="good__price">{getNumberWithSpaces(item.price)} &#8381;</div>
          </div>
          <div className="good__row">
            <a className="good__link" href="#">Подробнее</a>
            <button className="good__btn" data-art={item.art} onClick={onBuyClick}>Купить</button>
          </div>
        </article>
      </li>;
    });
  };

  return <ul className="goods-list">
    {getGoodList()}
  </ul>;
}

GoodsList.propTypes = {
  activePage: PropTypes.number.isRequired,
  setPopupOpen: PropTypes.func.isRequired
};

export default GoodsList;
