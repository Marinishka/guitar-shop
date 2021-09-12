import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import PopupAdd from '../popup-add/popup-add';
import PopupAdded from '../popup-added/popup-added';
import PopupDelete from '../popup-delete/popup-delete';

function Popup({popupOpen, setPopupOpen}) {

  const closePopup = () => {
    setPopupOpen(null);
    document.documentElement.classList.remove(`overflow--hidden`);
  };

  const getPopupAdd = (item) => {
    return <PopupAdd closePopup={closePopup} item={item} setPopupOpen={setPopupOpen}/>;
  };

  const getPopupAdded = () => {
    return <PopupAdded closePopup={closePopup}/>;
  };

  const getPopupDelete = (item) => {
    return <PopupDelete closePopup={closePopup} item={item}/>;
  };

  const PopupInners = {
    'add-item': getPopupAdd(popupOpen[1]),
    'added-item': getPopupAdded(),
    'delete': getPopupDelete(popupOpen[1])
  };

  const onCloseClick = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  const onOverlayClick = (evt) => {
    if (evt.target.classList.contains(`overlay`)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.documentElement.classList.add(`overflow--hidden`);
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
  setPopupOpen: PropTypes.func.isRequired
};

export default Popup;
