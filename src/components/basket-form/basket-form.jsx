import React from 'react';

function BasketForm() {
  return <form className="basket">
    <ul className="basket__list">
      <li className="basket__item">
        <section className="basket__section">
          <div className="basket__info">
            <button className="basket__btn-close"></button>
            <img className="basket__img" width="60" height="124" src="./img/electro-1-mini.png"></img>
            <div className="basket__specifications">
              <h3 className="basket__title">ЭлектроГитара Честер bass</h3>
              <div className="basket__characteristic">Артикул: SO757575</div>
              <div className="basket__characteristic">Электрогитара, 6 струнная</div>
            </div>
          </div>
          <div className="basket__price">17 500 &#8381;</div>
          <div className="basket__btns">
            <button className="basket__btn basket__btn--decrement" type="button">-</button>
            <input type="number" className="basket__amount"></input>
            <button className="basket__btn basket__btn--increment" type="button">+</button>
          </div>
          <div className="basket__item-sum">17 500 &#8381;</div>
        </section>
      </li>
      <li className="basket__item">
        <section className="basket__section">
          <div className="basket__info">
            <button className="basket__btn-close"></button>
            <img className="basket__img" width="60" height="124" src="./img/electro-1-mini.png"></img>
            <div className="basket__specifications">
              <h3 className="basket__title">Электрогитара СURT Z300</h3>
              <div className="basket__characteristic">Артикул: AO757599</div>
              <div className="basket__characteristic">Электрогитара, 6 струнная </div>
            </div>
          </div>
          <div className="basket__price">29 500 &#8381;</div>
          <div className="basket__btns">
            <button className="basket__btn basket__btn--decrement" type="button">-</button>
            <input type="number" className="basket__amount"></input>
            <button className="basket__btn basket__btn--increment" type="button">+</button>
          </div>
          <div className="basket__item-sum">29 500 &#8381;</div>
        </section>
      </li>
    </ul>
    <div className="basket__row">
      <div className="basket__column">
        <dl className="basket__promo-code">
          <dt className="basket__promo-code-title">Промокод на скидку</dt>
          <dd className="basket__promo-code-text">Введите свой промокод, если он у вас есть.</dd>
        </dl>
        <input className="basket__promo-code-input" type="text" aria-label="Введите промокод"></input>
        <button className="basket__promo-code-btn" type="">Применить купон</button>
      </div>
      <div className="basket__column basket__column--right">
        <div className="basket__sum">Всего 47 000 ₽</div>
        <button className="basket__submit" type="submit">Оформить заказ</button>
      </div>
    </div>
  </form>;
}

export default BasketForm;
