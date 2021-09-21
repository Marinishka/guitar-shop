import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GuitarTypes, KeyCode} from '../../const';
import {changeFilteredGuitars} from '../../store/action';
import {getNumberWithSpaces, sortFunctionToLargest} from '../../utils/common';

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

  const Filters = new Map([
    [`type`, function (guitar, activeValues) {
      if (activeValues.length > 0) {
        return activeValues.includes(guitar.type);
      } else {
        return true;
      }
    }],
    [`strings`, function (guitar, activeValues) {
      if (activeValues.length > 0) {
        return activeValues.includes(String(guitar.strings));
      } else {
        return true;
      }
    }],
    [`price`, function (guitar, activeValuesPrices) {
      return guitar.price >= activeValuesPrices.MIN && guitar.price <= activeValuesPrices.MAX;
    }]
  ]);

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

  const changeParameter = (filterType, newValue, activeValues, setNewValues) => {
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
    let guitarOptions = {
      'type': new Set(),
      'strings': new Set()
    };
    const newGuitarList = guitars.filter((guitar) => {
      let arrayOfFilterResults = [];
      for (let filter of Filters) {
        arrayOfFilterResults.push(filter[1](guitar, NewActiveValues[filter[0]]));
      }
      const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
        return lastValue && prevValue;
      });
      return result;
    });
    const newAvailableFilters = getAvailableFilters2(newGuitarList, filterType, guitarOptions, NewActiveValues);
    setAvailableFilters(newAvailableFilters);
    if (filterType === `price`) {
      minPrice.current.max = newActiveCheckedValues.MAX;
      maxPrice.current.min = newActiveCheckedValues.MIN;
      minPrice.current.min = availableFilters.price.MIN;
      maxPrice.current.max = availableFilters.price.MAX;
      minPrice.current.placeholder = getNumberWithSpaces(availableFilters.price.MIN);
      maxPrice.current.placeholder = getNumberWithSpaces(availableFilters.price.MAX);
    } else {
      minPrice.current.max = newAvailableFilters.price.MAX;
      maxPrice.current.min = newAvailableFilters.price.MIN;
      minPrice.current.min = newAvailableFilters.price.MIN;
      maxPrice.current.max = newAvailableFilters.price.MAX;
      minPrice.current.placeholder = getNumberWithSpaces(newAvailableFilters.price.MIN);
      maxPrice.current.placeholder = getNumberWithSpaces(newAvailableFilters.price.MAX);
    }
    dispatch(changeFilteredGuitars(newGuitarList));
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
    'price': function () {
    }
  };

  const getAvailableFilters2 = (guitarList, checkedFilter, guitarOptions, newActiveValues) => {
    const newFilters = availableFilters;
    if (checkedFilter === `strings`) {
      newFilters.price.MIN = Infinity;
      newFilters.price.MAX = -Infinity;
      const newGuitarsByPrice = guitars.filter((guitar) => {
        let result;
        let pricesForFilter;
        pricesForFilter = newActiveValues.price;
        result = Filters.get(`price`)(guitar, pricesForFilter);
        guitarOptions.strings.add(guitar.strings);
        return result;
      });
      if (newActiveValues.strings.length === 0 && newActiveValues.type.length === 0) {
        newFilters.price.MIN = filters.price.MIN;
        newFilters.price.MAX = filters.price.MAX;
      }
      if (newActiveValues.strings.length === 0) {
        if (newActiveValues.type.length === 0) {
          newGuitarsByPrice.filter((guitar) => {
            let arrayOfFilterResults = [];
            for (let filter of Filters) {
              if (filter[0] !== `strings` && filter[0] !== `type`) {
                arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
              }
            }
            const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
              return lastValue && prevValue;
            });
            if (result) {
              guitarOptions.type.add(guitar.type);
              guitarOptions.strings.add(guitar.strings);
            }
            return result;
          });
        } else {
          newGuitarsByPrice.filter((guitar) => {
            let arrayOfFilterResults = [];
            for (let filter of Filters) {
              if (filter[0] !== `strings` && filter[0] !== `type`) {
                arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
              }
            }
            const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
              return lastValue && prevValue;
            });
            if (result) {
              guitarOptions.type.add(guitar.type);
              guitarOptions.strings.add(guitar.strings);
            }
            return result;
          });
        }
      } else {
        if (newActiveValues.type.length === 0) {
          newGuitarsByPrice.filter((guitar) => {
            let arrayOfFilterResults = [];
            for (let filter of Filters) {
              if (filter[0] !== `type`) {
                arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
              }
            }
            const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
              return lastValue && prevValue;
            });
            if (result) {
              guitarOptions.type.add(guitar.type);
              guitarOptions.strings.add(guitar.strings);
            }
            return result;
          });
        } else {
          newGuitarsByPrice.filter((guitar) => {
            let arrayOfFilterResults = [];
            for (let filter of Filters) {
              arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
            }
            const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
              return lastValue && prevValue;
            });
            if (result) {
              guitarOptions.type.add(guitar.type);
              guitarOptions.strings.add(guitar.strings);
            }
            return result;
          });
        }
      }
      newFilters.type = guitarOptions.type;
      guitarList.forEach((guitar) => {
        if (newFilters.price.MIN >= guitar.price) {
          newFilters.price.MIN = guitar.price;
        }
        if (newFilters.price.MAX <= guitar.price) {
          newFilters.price.MAX = guitar.price;
        }
      });
    } else if (checkedFilter === `type`) {
      newFilters.price.MIN = Infinity;
      newFilters.price.MAX = -Infinity;
      const newGuitarsByPrice = guitars.filter((guitar) => {
        let result;
        let pricesForFilter;
        pricesForFilter = newActiveValues.price;
        result = Filters.get(`price`)(guitar, pricesForFilter);
        guitarOptions.type.add(guitar.type);
        return result;
      });
      if (newActiveValues.strings.length === 0 && newActiveValues.type.length === 0) {
        newFilters.price.MIN = filters.price.MIN;
        newFilters.price.MAX = filters.price.MAX;
      }
      if (newActiveValues.type.length === 0) {
        if (newActiveValues.strings.length === 0) {
          newGuitarsByPrice.filter((guitar) => {
            let arrayOfFilterResults = [];
            for (let filter of Filters) {
              if (filter[0] !== `strings` && filter[0] !== `type`) {
                arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
              }
            }
            const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
              return lastValue && prevValue;
            });
            if (result) {
              guitarOptions.type.add(guitar.type);
              guitarOptions.strings.add(guitar.strings);
            }
            return result;
          });
        } else {
          newGuitarsByPrice.filter((guitar) => {
            let arrayOfFilterResults = [];
            for (let filter of Filters) {
              if (filter[0] !== `strings`) {
                arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
              }
            }
            const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
              return lastValue && prevValue;
            });
            if (result) {
              guitarOptions.type.add(guitar.type);
              guitarOptions.strings.add(guitar.strings);
            }
            return result;
          });
        }
      } else {
        if (newActiveValues.strings.length === 0) {
          newGuitarsByPrice.filter((guitar) => {
            let arrayOfFilterResults = [];
            for (let filter of Filters) {
              if (filter[0] !== `strings`) {
                arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
              }
            }
            const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
              return lastValue && prevValue;
            });
            if (result) {
              guitarOptions.type.add(guitar.type);
              guitarOptions.strings.add(guitar.strings);
            }
            return result;
          });
        } else {
          newGuitarsByPrice.filter((guitar) => {
            let arrayOfFilterResults = [];
            for (let filter of Filters) {
              arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
            }
            const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
              return lastValue && prevValue;
            });
            if (result) {
              guitarOptions.type.add(guitar.type);
              guitarOptions.strings.add(guitar.strings);
            }
            return result;
          });
        }
      }
      newFilters.strings = guitarOptions.strings;
      guitarList.forEach((guitar) => {
        if (newFilters.price.MIN >= guitar.price) {
          newFilters.price.MIN = guitar.price;
        }
        if (newFilters.price.MAX <= guitar.price) {
          newFilters.price.MAX = guitar.price;
        }
      });
    } else {
      guitars.filter((guitar) => {
        let arrayOfFilterResults = [];
        for (let filter of Filters) {
          if (newActiveValues[filter[0]].length > 0 || filter[0] === `price`) {
            arrayOfFilterResults.push(filter[1](guitar, newActiveValues[filter[0]]));
          }
        }
        const result = arrayOfFilterResults.reduce(function (lastValue, prevValue) {
          return lastValue && prevValue;
        });
        if (result) {
          guitarOptions.type.add(guitar.type);
          guitarOptions.strings.add(guitar.strings);
        }
        newFilters.strings = guitarOptions.strings;
        newFilters.type = guitarOptions.type;
        return result;
      });
      if (newActiveValues.strings.length === 0 && newActiveValues.type.length === 0) {
        newFilters.price.MIN = filters.price.MIN;
        newFilters.price.MAX = filters.price.MAX;
      } else {
        newFilters.price = availableFilters.price;
      }
    }
    const filtersPipe = Object.keys(filters);
    filtersPipe.forEach((filter) => {
      AdjustmentsCheckedValues[filter](ActiveValues[filter], newFilters[filter]);
    });
    return newFilters;
  };

  const getUpdateNewFilters = (guitarList, newFilters, pipeFunctions, checkedFilterType, newActiveCheckedValues) => {
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
      const filtersPipe = [`type`, `strings`, `price`];
      if (newActiveCheckedValues.size === 0) {

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
    }
  };

  const getAvailableFilters = (guitarList, newActiveFilters, newActiveCheckedValues) => {
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
    getUpdateNewFilters(guitarList, newFilters, PipeFunctions, newActiveFilters, newActiveCheckedValues);
    return newFilters;
  };

  const onCheckboxClick = (evt) => {
    if (evt.target.tagName === `INPUT`) {
      changeParameter(evt.target.dataset.filter, evt.target.dataset[evt.target.dataset.filter], ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
    }
  };

  const PriceActions = {
    'MIN': function (evt) {
      if (Number(evt.target.value) !== activePrices.MIN) {
        if (Number(evt.target.value) > activePrices.MAX) {
          minPrice.current.value = activePrices.MAX;
          changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: activePrices.MAX}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        } else if (Number(evt.target.value) < availableFilters.price.MIN) {
          minPrice.current.value = availableFilters.price.MIN;
          changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: availableFilters.price.MIN}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        } else {
          changeParameter(evt.target.dataset.filter, {[evt.target.dataset[evt.target.dataset.filter]]: Number(evt.target.value)}, ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
        }
      }
    },
    'MAX': function (evt) {
      if (Number(evt.target.value) !== activePrices.MAX) {
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
    }
  };

  const onInputChange = (evt) => {
    if (evt.target.value) {
      PriceActions[evt.target.dataset.price](evt);
    }
  };

  const onCheckboxKeydown = (evt) => {
    // eslint-disable-next-line
    debugger;
    if (evt.keyCode === KeyCode.ENTER && evt.target.tagName === `LABEL`) {
      changeParameter(evt.target.dataset.filter, evt.target.dataset[evt.target.dataset.filter], ActiveValues[evt.target.dataset.filter], Setters[evt.target.dataset.filter]);
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
    const filtersInData = getAvailableFilters(guitars);
    setFilters(Object.freeze(filtersInData));
    setAvailableFilters(getAvailableFilters(guitars));
    setActivePrices(getAvailableFilters(guitars).price);
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
