import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {getNumberWithSpaces} from '../../utils/common';
import {ORDERS_IN_LIST} from '../../const';

function GoodsList({activePage, data}) {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    if (activePage === 1) {
      setOrderList(data.slice(0, 9));
    } else {
      setOrderList(data.slice((activePage - 1) * ORDERS_IN_LIST, (activePage - 1) * ORDERS_IN_LIST + ORDERS_IN_LIST));
    }
  }, [activePage]);

  const getGoodList = () => {
    return orderList.map((item) => {
      return <li className="goods-list__item" key={item.art}>
        <article className="good">
          <img className="good__img" src="./img/acoustic.png" width="68" height="190" alt="Гитара"></img>
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
            <button className="good__btn">Купить</button>
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
  data: PropTypes.array.isRequired
};

export default GoodsList;
