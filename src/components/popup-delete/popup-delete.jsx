import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {numberFormatter} from './../../utils/common';
import {deleteModelGuitar} from '../../store/action';
import {GuitarTypes} from '../../const';

function PopupDelete({onClosePopup, item}) {

  const dispatch = useDispatch();

  const onDeleteClick = (evt) => {
    evt.preventDefault();
    dispatch(deleteModelGuitar(item.art));
    onClosePopup();
  };

  const onСontinueClick = (evt) => {
    evt.preventDefault();
    onClosePopup();
  };

  return <div className="popup__inner">
    <p className="popup__text">Удалить этот товар? </p>
    <section className="popup__item">
      <img className="popup__img"
        src={`./img/${GuitarTypes[item.type][0]}-mini.png`}
        width="56"
        height="128"
        alt={`${item.strings}
        струнная ${item.type}
        ${item.name}`}></img>
      <div className="popup__specifications">
        <h3 className="popup__title">{item.name}</h3>
        <div className="popup__characteristic">Артикул: {item.art}</div>
        <div className="popup__characteristic">{item.type}, {item.strings} струнная</div>
        <div className="popup__price">Цена: {numberFormatter.format(item.price)} &#8381;</div>
      </div>
      <div className="popup__btns-delete">
        <button className="popup__delete" type="button" onClick={onDeleteClick}>Удалить товар</button>
        <button className="popup__btn-close" type="button" onClick={onСontinueClick}>Продолжить покупки</button>
      </div>
    </section>
  </div>;
}

PopupDelete.propTypes = {
  onClosePopup: PropTypes.func.isRequired,
  item: PropTypes.object
};

export default PopupDelete;
