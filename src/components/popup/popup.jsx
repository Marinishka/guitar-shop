import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import PopupAdd from '../popup-add/popup-add';
import PopupAdded from '../popup-added/popup-added';
import PopupDelete from '../popup-delete/popup-delete';
import {KeyCode} from '../../const';

function Popup({popupOpen, onSetPopupOpen}) {

  const onClosePopup = () => {
    onSetPopupOpen(null);
    document.documentElement.classList.remove(`overflow--hidden`);
  };

  const getPopupAdd = (item) => {
    return <PopupAdd item={item} onSetPopupOpen={onSetPopupOpen}/>;
  };

  const getPopupAdded = () => {
    return <PopupAdded onClosePopup={onClosePopup}/>;
  };

  const getPopupDelete = (item) => {
    return <PopupDelete onClosePopup={onClosePopup} item={item}/>;
  };

  const PopupInners = {
    'add-item': getPopupAdd(popupOpen[1]),
    'added-item': getPopupAdded(),
    'delete': getPopupDelete(popupOpen[1])
  };

  const onCloseClick = (evt) => {
    evt.preventDefault();
    onClosePopup();
  };

  const onOverlayClick = (evt) => {
    if (evt.target.classList.contains(`overlay`)) {
      onClosePopup();
    }
  };

  const onEscPress = (evt) => {
    if (evt.keyCode === KeyCode.ESCAPE) {
      onClosePopup();
    }
  };

  useEffect(() => {
    document.documentElement.classList.add(`overflow--hidden`);
    document.addEventListener(`keydown`, onEscPress);
    return () => {
      document.removeEventListener(`keydown`, onEscPress);
      document.body.classList.remove(`overflow--hidden`);
    };
  }, []);

  return <div className="overlay" onClick={onOverlayClick}>
    <div className="popup">
      <button className="popup__close" type="button" onClick={onCloseClick}></button>
      {PopupInners[popupOpen[0]]}
    </div>
  </div>;
}

Popup.propTypes = {
  popupOpen: PropTypes.array.isRequired,
  onSetPopupOpen: PropTypes.func.isRequired
};

export default Popup;
