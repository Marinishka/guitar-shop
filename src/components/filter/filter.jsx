import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CheckingEnteredValues, FilterModifiers, GuitarTypes, IsGuitarOptionsAvailable, KeyCode} from '../../const';
import {changeFilteredGuitars} from '../../store/action';
import {numberFormatter, sortFunctionToLargest} from '../../utils/common';

function Filter() {
  const dispatch = useDispatch();
  const guitars = useSelector((state) => state.DATA.guitars);
  const filteredGuitars = useSelector((state) => state.LOCAL.filteredGuitars);
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

  const onParameterChange = (filterType, newValue, activeValues, setNewValues) => {
    const newActiveCheckedValues = getNewActiveValues(activeValues, newValue);
    setNewValues(newActiveCheckedValues);
    const NewActiveValues = {
      'type': Array.from(activeTypes),
      'strings': Array.from(activeStrings),
      'price': activePrices
    };
    if (filterType !== `price`) {
      NewActiveValues[filterType] = Array.from(newActiveCheckedValues);
    } else {
      NewActiveValues[filterType] = newActiveCheckedValues;
    }
    const newGuitarList = guitars.filter((guitar) => {
      let arrayOfFilterResults = [];
      for (let guitarOption of IsGuitarOptionsAvailable) {
        arrayOfFilterResults.push(guitarOption[1](guitar, NewActiveValues[guitarOption[0]]));
      }
      const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
        return lastValue && prevValue;
      });
      return result;
    });
    const newAvailableFilters = getAvailableFilters(filterType, NewActiveValues);
    setAvailableFilters(newAvailableFilters);
    if (filterType === `price`) {
      minPrice.current.max = newActiveCheckedValues.MAX;
      maxPrice.current.min = newActiveCheckedValues.MIN;
      minPrice.current.min = availableFilters.price.MIN;
      maxPrice.current.max = availableFilters.price.MAX;
      minPrice.current.placeholder = numberFormatter.format(availableFilters.price.MIN);
      maxPrice.current.placeholder = numberFormatter.format(availableFilters.price.MAX);
    } else {
      minPrice.current.max = newAvailableFilters.price.MAX;
      maxPrice.current.min = newAvailableFilters.price.MIN;
      minPrice.current.min = newAvailableFilters.price.MIN;
      maxPrice.current.max = newAvailableFilters.price.MAX;
      minPrice.current.placeholder = numberFormatter.format(newAvailableFilters.price.MIN);
      maxPrice.current.placeholder = numberFormatter.format(newAvailableFilters.price.MAX);
    }
    dispatch(changeFilteredGuitars(newGuitarList));
  };

  const modificateAvailableFilters = (newActiveValues, unchangeableOption, guitarOptions, newFilters, isPricesChange = false) => {
    guitars.filter((guitar) => {
      let arrayOfFilterResults = [];
      let result;
      if (unchangeableOption === null) {
        arrayOfFilterResults.push(IsGuitarOptionsAvailable.get(`price`)(guitar, newActiveValues[`price`]));
        result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
          return lastValue && prevValue;
        });
        for (let guitarOption in guitarOptions) {
          if (Object.prototype.hasOwnProperty.call(guitarOptions, guitarOption)) {
            if (result) {
              guitarOptions[guitarOption].add(guitar[guitarOption]);
            }
          }
        }
      } else {
        let isGuitarPriceAvailable;
        for (let guitarOption of IsGuitarOptionsAvailable) {
          if (guitarOption[0] === unchangeableOption) {
            const isGuitarOptionAvailable = IsGuitarOptionsAvailable.get(guitarOption[0])(guitar, newActiveValues[guitarOption[0]]);
            arrayOfFilterResults.push(isGuitarOptionAvailable);
            if (isPricesChange && isGuitarOptionAvailable) {
              if (newFilters.price.MIN >= guitar.price) {
                newFilters.price.MIN = guitar.price;
              }
              if (newFilters.price.MAX <= guitar.price) {
                newFilters.price.MAX = guitar.price;
              }
            }
          } else if (guitarOption[0] === `price`) {
            isGuitarPriceAvailable = IsGuitarOptionsAvailable.get(guitarOption[0])(guitar, newActiveValues[guitarOption[0]]);
            arrayOfFilterResults.push(isGuitarPriceAvailable);
          }
        }
        if (isGuitarPriceAvailable) {
          guitarOptions[unchangeableOption].add(guitar[unchangeableOption]);
        }
        result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
          return lastValue && prevValue;
        });
        for (let guitarOption in guitarOptions) {
          if (guitarOption !== unchangeableOption && result) {
            guitarOptions[guitarOption].add(guitar[guitarOption]);
          }
        }
      }
      return result;
    });
    for (let filter in newFilters) {
      if (filter !== `price` && filter !== unchangeableOption) {
        newFilters[filter] = guitarOptions[filter];
      }
    }
  };

  const getAvailableFilters = (checkedFilter, newActiveValues) => {
    const guitarOptions = {
      'type': new Set(),
      'strings': new Set()
    };
    const newFilters = availableFilters;
    if (checkedFilter !== `price`) {
      newFilters.price.MIN = Infinity;
      newFilters.price.MAX = -Infinity;
      if (newActiveValues.type.length === 0 && newActiveValues.strings.length === 0) {
        modificateAvailableFilters(newActiveValues, null, guitarOptions, newFilters);
        newFilters.price.MIN = filters.price.MIN;
        newFilters.price.MAX = filters.price.MAX;
      } else if (newActiveValues.type.length > 0 || newActiveValues.strings.length > 0) {
        modificateAvailableFilters(newActiveValues, checkedFilter, guitarOptions, newFilters, true);
      }
    } else {
      let filtersForModifiredPrice = new Map();
      for (let guitarOption of IsGuitarOptionsAvailable) {
        if (newActiveValues[guitarOption[0]].length > 0 || guitarOption[0] === `price`) {
          filtersForModifiredPrice.set(guitarOption[0], guitarOption[1]);
        }
      }
      guitars.filter((guitar) => {
        let arrayOfFilterResults = [];
        for (let filter of filtersForModifiredPrice) {
          const isGuitarOptionAvailable = filter[1](guitar, newActiveValues[filter[0]]);
          arrayOfFilterResults.push(isGuitarOptionAvailable);
          if (filter[0] === `price` && isGuitarOptionAvailable) {
            guitarOptions.type.add(guitar.type);
            guitarOptions.strings.add(guitar.strings);
          }
        }
        const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
          return lastValue && prevValue;
        });
        return result;
      });
      newFilters.strings = guitarOptions.strings;
      newFilters.type = guitarOptions.type;
      if (newActiveValues.strings.length === 0 && newActiveValues.type.length === 0) {
        newFilters.price.MIN = filters.price.MIN;
        newFilters.price.MAX = filters.price.MAX;
      } else {
        newFilters.price = availableFilters.price;
      }
    }
    for (let checkedValue of CheckingEnteredValues) {
      CheckingEnteredValues.get(checkedValue[0])(ActiveValues[checkedValue[0]], newFilters[checkedValue[0]]);
    }
    return newFilters;
  };

  const getFilters = (guitarList) => {
    const newFilters = {
      'type': new Set(),
      'strings': new Set(),
      'price': {
        MIN: guitarList[0] ? guitarList[0].price : 0,
        MAX: 0
      }
    };
    guitarList.forEach((guitar) => {
      for (let filter of FilterModifiers) {
        FilterModifiers.get(filter[0])(guitar, newFilters);
      }
    });
    minPrice.current.max = newFilters.price.MAX;
    maxPrice.current.min = newFilters.price.MIN;
    minPrice.current.min = newFilters.price.MIN;
    maxPrice.current.max = newFilters.price.MAX;
    minPrice.current.placeholder = numberFormatter.format(newFilters.price.MIN);
    maxPrice.current.placeholder = numberFormatter.format(newFilters.price.MAX);
    return newFilters;
  };

  const PriceActions = {
    'MIN': function (evt) {
      if (Number(evt.target.value) !== activePrices.MIN) {
        if (Number(evt.target.value) > activePrices.MAX) {
          minPrice.current.value = activePrices.MAX;
          onParameterChange(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: activePrices.MAX}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        } else if (Number(evt.target.value) < availableFilters.price.MIN) {
          minPrice.current.value = availableFilters.price.MIN;
          onParameterChange(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: availableFilters.price.MIN}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        } else {
          onParameterChange(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: Number(evt.target.value)}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        }
      }
    },
    'MAX': function (evt) {
      if (Number(evt.target.value) !== activePrices.MAX) {
        if (Number(evt.target.value) < activePrices.MIN) {
          maxPrice.current.value = activePrices.MIN;
          onParameterChange(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: activePrices.MIN}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        } else if (Number(evt.target.value) > availableFilters.price.MAX) {
          maxPrice.current.value = availableFilters.price.MAX;
          onParameterChange(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: availableFilters.price.MAX}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        } else {
          onParameterChange(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: Number(evt.target.value)}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        }
      }
    }
  };

  const onInputChange = (evt) => {
    if (evt.target.value) {
      PriceActions[evt.target.dataset.price](evt);
    }
  };

  const onCheckboxKeydown = (evt) => {
    if (evt.keyCode === KeyCode.ENTER && evt.target.tagName === `LABEL`) {
      onParameterChange(evt.target.dataset.filter, evt.target.dataset[evt.target.dataset.filter], ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
    }
  };

  const onCheckboxClick = (evt) => {
    if (evt.target.tagName === `INPUT`) {
      onParameterChange(evt.target.dataset.filter, evt.target.dataset[evt.target.dataset.filter], ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
    }
  };

  const getGuitarTypes = () => {
    let types = [];
    filters[`type`].forEach((type) => {
      types.push(
          <label
            data-filter="type"
            data-type={type}
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
            key={`strings-${number}`}
            data-filter="strings"
            data-strings={number}>
            <input className="filter__checkbox" type="checkbox" data-filter="strings" data-strings={number} disabled={!availableFilters[`strings`].has(number)}></input>
            {number}
          </label>
      );
    });
    return strings;
  };

  useEffect(() => {
    setFilters(Object.freeze(getFilters(guitars)));
    setAvailableFilters(getFilters(guitars));
    setActivePrices(getFilters(guitars).price);
    dispatch(changeFilteredGuitars(guitars));
  }, [guitars]);

  useEffect(() => {
  }, [filteredGuitars]);

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
    <fieldset className="filter__fieldset" name="types" onClick={onCheckboxClick} onKeyDown={onCheckboxKeydown}>
      <legend className="filter__legend">Тип гитар</legend>
      {filters.type.size > 0 ? getGuitarTypes() : ``}
    </fieldset>
    <fieldset className="filter__fieldset" name="strings" onClick={onCheckboxClick} onKeyDown={onCheckboxKeydown}>
      <legend className="filter__legend">Количество струн</legend>
      {filters.strings.size > 0 ? getGuitarStrings() : ``}
    </fieldset>
  </form>;
}

export default Filter;
