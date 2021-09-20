import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GuitarTypes} from '../../const';
import {changeFilteredGuitars} from '../../store/action';
import {getNumberWithSpaces, sortFunctionToLargest} from '../../utils/common';

function Filter() {
  const dispatch = useDispatch();
  const guitars = useSelector((state) => state.DATA.guitars);
  const [activeFilters, setActiveFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState({});
  const [activeTypes, setActiveTypes] = useState(new Set());
  const [activeStrings, setActiveStrings] = useState(new Set());
  const [activePrices, setActivePrices] = useState({MIN: 0, MAX: 0});
  const [filters, setFilters] = useState({
    'type': new Set(),
    'strings': new Set(),
    'price': {
      MIN: 0,
      MAX: 0
    }
  });

  const minPrice = useRef();
  const maxPrice = useRef();

  const getFilteredListByType = ([guitarList, activeValuesTypes, activeValuesStrings, activeValuesPrices]) => {
    let newList;
    newList = guitarList.filter((guitar) => activeValuesTypes.has(String(guitar.type)));
    return [newList, activeValuesTypes, activeValuesStrings, activeValuesPrices];
  };

  const getFilteredListByStrings = ([guitarList, activeValuesTypes, activeValuesStrings, activeValuesPrices]) => {
    let newList;
    newList = guitarList.filter((guitar) => activeValuesStrings.has(String(guitar.strings)));
    return [newList, activeValuesTypes, activeValuesStrings, activeValuesPrices];
  };

  const getFilteredListByPrices = ([guitarList, activeValuesTypes, activeValuesStrings, activeValuesPrices]) => {
    let newList;
    newList = guitarList.filter((guitar) => guitar.price >= activeValuesPrices.MIN && guitar.price <= activeValuesPrices.MAX);
    return [newList, activeValuesTypes, activeValuesStrings];
  };

  const Filters = {
    'type': getFilteredListByType,
    'strings': getFilteredListByStrings,
    'price': getFilteredListByPrices
  };

  const ActiveValues = {
    'type': activeTypes,
    'strings': activeStrings,
    'price': activePrices
  };

  const Setters = {
    'type': setActiveTypes,
    'strings': setActiveStrings,
    'price': setActivePrices
  };

  const getNewActiveFilters = (filterType, newActiveValues) => {
    let newActiveFilters = activeFilters;
    const indexFilter = activeFilters.indexOf(filterType);
    if (newActiveValues.size === 0) {
      newActiveFilters.splice(indexFilter, 1);
    } else if (indexFilter === -1) {
      newActiveFilters.push(filterType);
    }
    setActiveFilters(newActiveFilters);
    return newActiveFilters;
  };

  const getNewActiveValues = (activeValues, newValue) => {
    const typeNewValue = typeof newValue;
    let newActiveValues;
    switch (typeNewValue) {
      case `object`:
        newActiveValues = {};
        for (let key in activeValues) {
          if (key === Object.keys(newValue)[0]) {
            newActiveValues[key] = newValue[key];
          } else {
            newActiveValues[key] = activeValues[key];
          }
        }
        break;
      case `string`:
        newActiveValues = activeValues;
        if (newActiveValues.has(newValue)) {
          newActiveValues.delete(newValue);
        } else {
          newActiveValues.add(newValue);
        }
        break;
      default:
        newActiveValues = activeValues;
    }
    return newActiveValues;
  };

  const AdjustmentsCheckedValues = {
    'type': function (checkedValues, availableValues) {
      checkedValues.forEach((value) => {
        if (!availableValues.has(value)) {
          checkedValues.delete(value);
        }
      });
    },
    'strings': function (checkedValues, availableValues) {
      checkedValues.forEach((value) => {
        if (!availableValues.has(Number(value))) {
          checkedValues.delete(value);
        }
      });
    },
    'price': function (checkedValues, availableValues) {
      setActivePrices(availableValues);
    }
  };

  const changeParameter = (filterType, newValue, activeValues, setNewValues) => {
    const newActiveCheckedValues = getNewActiveValues(activeValues, newValue);
    const NewActiveValues = {
      'strings': [activeTypes, newActiveCheckedValues, activePrices],
      'type': [newActiveCheckedValues, activeStrings, activePrices],
      'price': [activeTypes, activeStrings, newActiveCheckedValues]
    };
    const newActiveFilters = getNewActiveFilters(filterType, newActiveCheckedValues);
    newActiveFilters.reduce((acc, type) => acc.then(Filters[type]), Promise.resolve([guitars, ...NewActiveValues[filterType]])).then((res) => {
      const ress = res[0];
      dispatch(changeFilteredGuitars(ress));
      const newAvailableFilters = getAvailableFilters(ress, filterType, setNewValues);
      setNewValues(newActiveCheckedValues);
      setAvailableFilters(newAvailableFilters);
      if (filterType === `price`) {
        minPrice.current.max = newActiveCheckedValues.MAX;
        maxPrice.current.min = newActiveCheckedValues.MIN;
        minPrice.current.min = availableFilters.price.MIN;
        maxPrice.current.max = availableFilters.price.MAX;
        minPrice.current.placeholder = getNumberWithSpaces(availableFilters.price.MIN);
        maxPrice.current.placeholder = getNumberWithSpaces(availableFilters.price.MAX);
        if (!minPrice.current.value) {
          minPrice.current.value = activePrices.MIN;
        }
        if (!maxPrice.current.value) {
          maxPrice.current.value = activePrices.MAX;
        }
      } else {
        minPrice.current.max = newAvailableFilters.price.MAX;
        maxPrice.current.min = newAvailableFilters.price.MIN;
        minPrice.current.min = newAvailableFilters.price.MIN;
        maxPrice.current.max = newAvailableFilters.price.MAX;
        if (minPrice.current.value && minPrice.current.value < newAvailableFilters.price.MIN) {
          minPrice.current.value = newAvailableFilters.price.MIN;
        }
        if (maxPrice.current.value && maxPrice.current.value > newAvailableFilters.price.MAX) {
          maxPrice.current.value = newAvailableFilters.price.MAX;
        }
        minPrice.current.placeholder = getNumberWithSpaces(newAvailableFilters.price.MIN);
        maxPrice.current.placeholder = getNumberWithSpaces(newAvailableFilters.price.MAX);
      }
    });
  };

  const getUpdateNewFilters = (guitarList, newFilters, pipeFunctions, checkedFilterType) => {
    if (typeof checkedFilterType === `undefined`) {
      const filtersPipe = Object.keys(filters);
      guitarList.forEach((guitar) => {
        filtersPipe.forEach((filter) => {
          pipeFunctions[filter](guitar);
        });
      });
      minPrice.current.max = newFilters.price.MAX;
      maxPrice.current.min = newFilters.price.MIN;
      minPrice.current.min = newFilters.price.MIN;
      maxPrice.current.max = newFilters.price.MAX;
      minPrice.current.placeholder = getNumberWithSpaces(newFilters.price.MIN);
      maxPrice.current.placeholder = getNumberWithSpaces(newFilters.price.MAX);
    } else {
      const filtersPipe = Object.keys(filters).filter((filter) => filter !== checkedFilterType);
      if (ActiveValues[checkedFilterType].size === 0) {
        guitarList.forEach((guitar) => {
          pipeFunctions[checkedFilterType](guitar);
        });
        filtersPipe.forEach((filter) => {
          if (ActiveValues[filter].size > 0) {
            guitarList.forEach((guitar) => {
              pipeFunctions[filter](guitar);
            });
          } else {
            guitarList.forEach((guitar) => {
              pipeFunctions[filter](guitar);
            });
          }
        });
      } else {
        guitarList.forEach((guitar) => {
          filtersPipe.forEach((filter) => {
            pipeFunctions[filter](guitar);
          });
        });
        newFilters[checkedFilterType] = availableFilters[checkedFilterType];
      }
      filtersPipe.forEach((filter) => {
        AdjustmentsCheckedValues[filter](ActiveValues[filter], newFilters[filter]);
      });
    }
  };

  const getAvailableFilters = (guitarList, checkedFilterType) => {
    const newFilters = {
      'type': new Set(),
      'strings': new Set(),
      'price': {
        MIN: guitarList[0] ? guitarList[0].price : 0,
        MAX: 0
      }
    };
    const PipeFunctions = {
      'type': function (guitar) {
        newFilters.type.add(guitar.type);
      },
      'strings': function (guitar) {
        newFilters.strings.add(guitar.strings);
      },
      'price': function (guitar) {
        if (newFilters.price.MIN >= guitar.price) {
          newFilters.price.MIN = guitar.price;
        }
        if (newFilters.price.MAX <= guitar.price) {
          newFilters.price.MAX = guitar.price;
        }
      }
    };
    getUpdateNewFilters(guitarList, newFilters, PipeFunctions, checkedFilterType);
    return newFilters;
  };

  const onCheckboxClick = (evt) => {
    if (evt.target.tagName === `INPUT`) {
      changeParameter(evt.target.dataset.filter, evt.target.dataset[evt.target.dataset.filter], ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
    }
  };

  const PriceActions = {
    'MIN': function (evt) {
      if (Number(evt.target.value) > activePrices.MAX) {
        minPrice.current.value = activePrices.MAX;
        changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: activePrices.MAX}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
      } else if (Number(evt.target.value) < availableFilters.price.MIN) {
        minPrice.current.value = availableFilters.price.MIN;
        changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: availableFilters.price.MIN}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
      } else {
        changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: Number(evt.target.value)}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
      }
    },
    'MAX': function (evt) {
      if (Number(evt.target.value) < activePrices.MIN) {
        maxPrice.current.value = activePrices.MIN;
        changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: activePrices.MIN}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
      } else if (Number(evt.target.value) > availableFilters.price.MAX) {
        maxPrice.current.value = availableFilters.price.MAX;
        changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: availableFilters.price.MAX}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
      } else {
        changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: Number(evt.target.value)}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
      }
    }
  };

  const onInputChange = (evt) => {
    if (evt.target.value) {
      PriceActions[evt.target.dataset.price](evt);
    }
  };

  const getGuitarTypes = () => {
    let types = [];
    filters[`type`].forEach((type) => {
      types.push(
          <label
            className={`filter__checkbox-label ${availableFilters[`type`].has(type) ? `` : `filter__checkbox-label--disable`} ${activeTypes.has(type) ? `filter__checkbox-label--active` : ``}`}
            tabIndex={availableFilters[`type`].has(type) ? `0` : `-1`}
            key={GuitarTypes[type][0]}>
            <input className="filter__checkbox" type="checkbox" data-filter="type" data-type={type} disabled={!availableFilters[`type`].has(type)}></input>
            {GuitarTypes[type][1]}
          </label>
      );
    });
    return types;
  };

  const getGuitarStrings = () => {
    let strings = [];
    Array.from(filters[`strings`]).sort(sortFunctionToLargest).forEach((number) => {
      strings.push(
          <label className={`filter__checkbox-label ${availableFilters[`strings`].has(number) ? `` : `filter__checkbox-label--disable`} ${activeStrings.has(String(number)) ? `filter__checkbox-label--active` : ``}  `}
            tabIndex={availableFilters[`strings`].has(number) ? `0` : `-1`}
            key={`strings-${number}`}>
            <input className="filter__checkbox" type="checkbox" data-filter="strings" data-strings={number} disabled={!availableFilters[`strings`].has(number)}></input>
            {number}
          </label>
      );
    });
    return strings;
  };

  useEffect(() => {
    const filtersInData = getAvailableFilters(guitars);
    setFilters(filtersInData);
    setAvailableFilters(filtersInData);
    setActivePrices(filtersInData[`price`]);
    dispatch(changeFilteredGuitars(guitars));
  }, [guitars]);

  return <form className="filter">
    <h3 className="filter__title">Фильтр</h3>
    <fieldset className="filter__fieldset" name="price" onBlur={onInputChange}>
      <legend className="filter__legend">Цена, &#8381;</legend>
      <label className="filter__label">
        <input className="filter__input" ref={minPrice} type="number" min="0" max="0" data-filter="price" data-price="MIN" aria-label="Минимальная цена"></input>
      </label>
      <label className="filter__label">
        <input className="filter__input" ref={maxPrice} type="number" min="0" max="0" data-filter="price" data-price="MAX" aria-label="Максимальная цена"></input>
      </label>
    </fieldset>
    <fieldset className="filter__fieldset" name="types" onClick={onCheckboxClick}>
      <legend className="filter__legend">Тип гитар</legend>
      {filters.type.size > 0 ? getGuitarTypes() : ``}
    </fieldset>
    <fieldset className="filter__fieldset" name="strings" onClick={onCheckboxClick}>
      <legend className="filter__legend">Количество струн</legend>
      {filters.strings.size > 0 ? getGuitarStrings() : ``}
    </fieldset>
  </form>;
}

export default Filter;
