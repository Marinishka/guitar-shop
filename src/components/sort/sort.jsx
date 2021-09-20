import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeFilteredGuitars} from '../../store/action';
import {sortFunctionToLargest, sortFunctionToSmallest} from '../../utils/common';

function Sort() {
  const [sortParameter, setSortParameter] = useState(`initial`);
  const [sortingDirection, setSortingDirection] = useState(`initial`);
  const filteredGuitars = useSelector((state) => state.LOCAL.filteredGuitars);

  const dispatch = useDispatch();

  const SortingFunctions = {
    'initial': function (guitarList) {
      return guitarList;
    },
    'to-largest': sortFunctionToLargest,
    'to-smallest': sortFunctionToSmallest
  };

  const GettersAssortedGuitars = {
    'initial': function (guitarList) {
      return guitarList;
    },
    'sorting': function (guitarList, sortFunction) {
      return guitarList.slice().sort(sortFunction);
    }
  };

  const onSortParameterClick = (evt) => {
    evt.preventDefault();
    setSortParameter(evt.target.dataset.parameter);
    if (sortingDirection === `initial`) {
      setSortingDirection(`to-largest`);
      dispatch(changeFilteredGuitars(GettersAssortedGuitars[`sorting`](filteredGuitars, SortingFunctions[`to-largest`](evt.target.dataset.parameter))));
    } else {
      dispatch(changeFilteredGuitars(GettersAssortedGuitars[`sorting`](filteredGuitars, SortingFunctions[sortingDirection](evt.target.dataset.parameter))));
    }
  };

  const onSortDirectionClick = (evt) => {
    evt.preventDefault();
    setSortingDirection(evt.target.dataset.direction);
    if (sortParameter === `initial`) {
      setSortParameter(`price`);
      dispatch(changeFilteredGuitars(GettersAssortedGuitars[`sorting`](filteredGuitars, SortingFunctions[evt.target.dataset.direction](`price`))));
    } else {
      dispatch(changeFilteredGuitars(GettersAssortedGuitars[`sorting`](filteredGuitars, SortingFunctions[evt.target.dataset.direction](sortParameter))));
    }
  };

  return <div className="sort">
    <span className="sort__title">Сортировать:</span>
    <ul className="sort__list" onClick={onSortParameterClick}>
      <li className="sort__item">
        <button className={`sort__btn-type ${sortParameter === `price` ? `sort__btn-type--active` : ``}`}
          type="button"
          data-parameter="price">по цене</button>
      </li>
      <li className="sort__item">
        <button className={`sort__btn-type ${sortParameter === `reviews` ? `sort__btn-type--active` : ``}`}
          type="button"
          data-parameter="reviews">по популярности</button>
      </li>
    </ul>
    <div className="sort__direction" onClick={onSortDirectionClick}>
      <button className={`sort__btn-direction sort__btn-direction--ascending ${sortingDirection === `to-largest` ? `sort__btn-direction--active` : ``}`}
        type="button"
        data-direction="to-largest"
        aria-label="по возрастанию"></button>
      <button className={`sort__btn-direction sort__btn-direction--descending ${sortingDirection === `to-smallest` ? `sort__btn-direction--active` : ``}`}
        type="button"
        data-direction="to-smallest"
        aria-label="по убыванию"></button>
    </div>
  </div>;
}

export default Sort;
