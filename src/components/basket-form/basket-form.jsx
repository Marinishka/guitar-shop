import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import GuitarInBasket from '../guitar-in-basket/guitar-in-basket';
import {getNumberWithSpaces} from '../../utils/common';
import {PromoCodeErrors, PromoCodeValues} from '../../const';

function BasketForm({setPopupOpen}) {
  const guitarsInBasket = useSelector((state) => state.LOCAL.guitarsInBasket);
  const guitars = useSelector((state) => state.DATA.guitars);
  const [promoCode, setPromoCode] = useState(`NOPROMO`);
  const [errorPromoCode, setErrorPromoCode] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);

  const getGuitarsList = (items) => {
    return items.map((item) => {
      const guitarInBasket = guitars.find((guitar) => guitar.art === item.art);
      return <GuitarInBasket key={item.art} guitarInBasket={guitarInBasket} item={item} setPopupOpen={setPopupOpen}/>;
    });
  };

  const inputPromoCode = (evt) => {
    setPromoCode(evt.target.value.toUpperCase());
  };

  const onPromoCodeBtnClick = () => {
    if (Object.keys(PromoCodeValues).includes(promoCode.toUpperCase())) {
      setErrorPromoCode(false);
      getSum(promoCode);
    } else {
      setErrorPromoCode(`no-promo-code`);
      getSum();
    }
  };

  const getGitarahitPromoCode = (sum) => {
    return function () {
      return sum * (1 - PromoCodeValues.GITARAHIT * 0.01);
    };
  };

  const getGitara2020PromoCode = (sum) => {
    return function () {
      if (PromoCodeValues.GITARA2020.VALUE < sum * (PromoCodeValues.GITARA2020.MIN * 0.01)) {
        return sum - PromoCodeValues.GITARA2020.VALUE;
      } else {
        setErrorPromoCode(`amount-below-30-percent`);
        return sum;
      }
    };
  };

  const getSumWithoutPromoCode = () => {
    let summ = 0;
    guitarsInBasket.forEach((guitarModel) => {
      summ += guitars.find((guitar) => guitar.art === guitarModel.art)[`price`] * guitarModel[`quantity`];
    });
    return summ;
  };

  const getSum = (code = `NOPROMO`) => {
    const sum = getSumWithoutPromoCode();
    const PromoCodes = {
      'NOPROMO': sum,
      'GITARAHIT': getGitarahitPromoCode(sum),
      'GITARA2020': getGitara2020PromoCode(sum)
    };
    setSumPrice(PromoCodes[code]);
  };

  useEffect(() => {
    getSum();
    setErrorPromoCode(false);
  }, [guitarsInBasket]);

  return <form className="basket">
    <ul className="basket__list">
      {getGuitarsList(guitarsInBasket)}
    </ul>
    <div className="basket__row">
      <div className="basket__column">
        <dl className="basket__promo-code">
          <dt className="basket__promo-code-title">Промокод на скидку</dt>
          <dd className="basket__promo-code-text">Введите свой промокод, если он у вас есть.</dd>
        </dl>
        <input className="basket__promo-code-input" type="text" aria-label="Введите промокод" onInput={inputPromoCode}></input>
        {errorPromoCode ? <div className="basket__error-promo-code">{PromoCodeErrors[errorPromoCode]}</div> : ``}
        <button className="basket__promo-code-btn" type="button" onClick={onPromoCodeBtnClick}>Применить купон</button>
      </div>
      <div className="basket__column basket__column--right">
        <div className="basket__sum">Всего {getNumberWithSpaces(sumPrice)} &#8381;</div>
        <button className="basket__submit" type="submit">Оформить заказ</button>
      </div>
    </div>
  </form>;
}

BasketForm.propTypes = {
  setPopupOpen: PropTypes.func.isRequired
};

export default BasketForm;
