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
