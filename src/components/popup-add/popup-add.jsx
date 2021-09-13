import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {getCapitalizedWord, getNumberWithSpaces} from './../../utils/common';
import {addGuitar} from '../../store/action';

function PopupAdd({item, setPopupOpen}) {

  const dispatch = useDispatch();

  const onAddClick = (evt) => {
    evt.preventDefault();
    setPopupOpen([`added-item`, null]);
    dispatch(addGuitar(item.art));
  };

  return <div className="popup__inner">
    <p className="popup__text">Добавить товар в корзину</p>
    <section className="popup__item">
      <img className="popup__img"
        src='./img/electro-1-mini.png'
        width="56"
        height="128"
        alt={`${item.strings} струнная ${item.type} ${item.name}`}></img>
      <div className="popup__specifications">
        <h3 className="popup__title">{item.name}</h3>
        <div className="popup__characteristic">Артикул: {item.art}</div>
        <div className="popup__characteristic">{getCapitalizedWord(item.type)}, {item.strings} струнная</div>
        <div className="popup__price">Цена: {getNumberWithSpaces(item.price)} &#8381;</div>
      </div>
      <button className="popup__add" type="button" onClick={onAddClick}>Добавить в корзину</button>
    </section>
  </div>;
}

PopupAdd.propTypes = {
  item: PropTypes.object,
  setPopupOpen: PropTypes.func.isRequired
};

export default PopupAdd;
