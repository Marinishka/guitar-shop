import React from 'react';
import PropTypes from 'prop-types';
import {KeyCode} from '../../const';

function Pagination({activePage, amountPages, onSetActivePage}) {

  const getPaginationItems = (activeP, orderPages) => {
    let pageNums = [];
    if (orderPages <= 3) {
      for (let i = 1; i <= orderPages; i++) {
        pageNums.push(i);
      }
    } else {
      pageNums.push(1);
      if (activeP === 1 || activeP === 2) {
        pageNums.push(2, `...`, orderPages);
      } else {
        pageNums.push(`...`);
        if (activeP <= orderPages - 2) {
          pageNums.push(activeP, `...`, orderPages);
        } else if (activeP === orderPages || activeP === orderPages - 1) {
          pageNums.push(orderPages - 1, orderPages);
        }
      }
    }
    return pageNums.map((item, indx) => {
      return <li
        className={`pagination__item ${item === activeP ? `pagination__item--active` : ``}`}
        key={`${item}-${indx}`}
        onClick={onPaginationItemClick}
        onKeyDown={onPaginationItemKeydown}
        data-value={item}
        tabIndex="0">
        {item}
      </li>;
    });
  };

  const onPaginationItemClick = (evt) => {
    if (evt.target.dataset.value !== `...`) {
      onSetActivePage(Number(evt.target.dataset.value));
    }
  };

  const onPaginationItemKeydown = (evt) => {
    if (evt.keyCode === KeyCode.ENTER && evt.target.dataset.value !== `...`) {
      onSetActivePage(Number(evt.target.dataset.value));
    }
  };

  const onBtnNextClick = () => {
    onSetActivePage(activePage + 1);
  };

  const onBtnPrevClick = () => {
    onSetActivePage(activePage - 1);
  };

  const getBtnPrev = () => {
    return activePage > 1 ? <button className="pagination__btn pagination__btn--prev" onClick={onBtnPrevClick}>Назад</button> : ``;
  };

  const getBtnNext = () => {
    return activePage < amountPages ? <button className="pagination__btn pagination__btn--next" onClick={onBtnNextClick}>Далее</button> : ``;
  };

  return <div className="pagination">
    {getBtnPrev()}
    <ul className="pagination__list">
      {getPaginationItems(activePage, amountPages)}
    </ul>
    {getBtnNext()}
  </div>;
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  amountPages: PropTypes.number.isRequired,
  onSetActivePage: PropTypes.func.isRequired
};

export default Pagination;
