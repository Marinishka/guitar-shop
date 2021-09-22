export const ORDERS_IN_LIST = 9;

export const Routes = {
  CATALOG: `/`,
  BASKET: `/basket`
};

export const PromoCodeValues = {
  GITARAHIT: 10,
  SUPERGITARA: 700,
  GITARA2020: {
    VALUE: 3000,
    MIN: 30
  }
};

export const PromoCodeErrors = {
  'no-promo-code': `Нет такого промо кода`,
  'amount-below-30-percent': `Для этого промокода сумма вашей покупки должна быть выше 10 000 рублей`
};

export const GuitarTypes = {
  'акустическая гитара': [`acoustic`, `Акустические гитары`],
  'электрогитара': [`electric-guitar`, `Элекрогитары`],
  'укулеле': [`ukulele`, `Укулеле`]
};

export const TypesEithStrings = {
  'акустическая гитара': [6, 7, 12],
  'электрогитара': [4, 6, 7],
  'укулеле': [4]
};

export const KeyCode = {
  ESCAPE: 27,
  ENTER: 13
};

export const FilterModifiers = new Map([
  [`type`, function (guitar, newFilters) {
    newFilters.type.add(guitar.type);
  }],
  [`strings`, function (guitar, newFilters) {
    newFilters.strings.add(guitar.strings);
  }],
  [`price`, function (guitar, newFilters) {
    if (newFilters.price.MIN >= guitar.price) {
      newFilters.price.MIN = guitar.price;
    }
    if (newFilters.price.MAX <= guitar.price) {
      newFilters.price.MAX = guitar.price;
    }
  }]
]);

export const IsGuitarOptionsAvailable = new Map([
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

export const CheckingEnteredValues = new Map([
  [`type`, function (checkedValues, availableValues) {
    checkedValues.forEach((value) => {
      if (!availableValues.has(value)) {
        checkedValues.delete(value);
      }
    });
  }],
  [`strings`, function (checkedValues, availableValues) {
    checkedValues.forEach((value) => {
      if (!availableValues.has(Number(value))) {
        checkedValues.delete(value);
      }
    });
  }]
]);
