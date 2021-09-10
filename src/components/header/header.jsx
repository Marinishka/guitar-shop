import React from 'react';
import {Link} from 'react-router-dom';
import {Routes} from '../../const';

function Header() {
  return <header className="header">
    <div className="header__upper">
      <nav className="header__nav">
        <a className="header__logo-link" href="#">
          <img className="header__logo-img" width="67" height="70" src="./img/logo.svg" aria-label="Логотип магазина Guitar Shop"></img>
        </a>
        <ul className="header__nav-list header-nav-list">
          <li className="header-nav-list__item">
            <Link className="header-nav-list__link" to={Routes.CATALOG}>Каталог</Link>
          </li>
          <li className="header-nav-list__item">
            <a className="header-nav-list__link" href="#">Где купить?</a>
          </li>
          <li className="header-nav-list__item">
            <a className="header-nav-list__link" href="#">О компании</a>
          </li>
          <li className="header-nav-list__item">
            <a className="header-nav-list__link" href="#">Cервис-центры</a>
          </li>
        </ul>
        <ul className="header__user-list header-user-list">
          <li className="header-user-list__item">
            <a className="header-user-list__link header-user-list__link--contacts" href="#" aria-label="Контакты">
              <svg className="header-user-list__icon" width="14" height="17" viewBox="0 0 14 17" fill="none">
                <path d="M12.875 7.35227C12.875 11.8068 6.875 15.625 6.875 15.625C6.875 15.625 0.875 11.8068 0.875 7.35227C0.875 5.83331 1.50714 4.37655 2.63236 3.30248C3.75758 2.22841 5.2837 1.625 6.875 1.625C8.4663 1.625 9.99242 2.22841 11.1176 3.30248C12.2429 4.37655 12.875 5.83331 12.875 7.35227Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.875 9.26154C7.97957 9.26154 8.875 8.40681 8.875 7.35245C8.875 6.29809 7.97957 5.44336 6.875 5.44336C5.77043 5.44336 4.875 6.29809 4.875 7.35245C4.875 8.40681 5.77043 9.26154 6.875 9.26154Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </li>
          <li className="header-user-list__item">
            <a className="header-user-list__link header-user-list__link--search" href="#" aria-label="Поиск">
              <svg className="header-user-list__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.0276 9.02893L13.7934 12.7948C13.9257 12.9273 14.0001 13.1069 14 13.2942C13.9999 13.4814 13.9255 13.661 13.793 13.7934C13.6606 13.9257 13.481 14.0001 13.2937 14C13.1064 13.9999 12.9269 13.9255 12.7945 13.793L9.0287 10.0271C7.90295 10.8991 6.48731 11.3094 5.06977 11.1746C3.65223 11.0399 2.33927 10.3701 1.39799 9.30165C0.456712 8.23318 -0.0421836 6.84624 0.0027973 5.42299C0.0477782 3.99973 0.633257 2.64707 1.64013 1.64017C2.647 0.633273 3.99963 0.0477794 5.42285 0.00279737C6.84607 -0.0421846 8.23297 0.456724 9.30142 1.39803C10.3699 2.33933 11.0396 3.65233 11.1743 5.0699C11.3091 6.48748 10.8988 7.90315 10.0269 9.02893H10.0276ZM5.60026 9.79961C6.71412 9.79961 7.78235 9.35712 8.56997 8.56948C9.35759 7.78185 9.80007 6.71358 9.80007 5.5997C9.80007 4.48581 9.35759 3.41755 8.56997 2.62992C7.78235 1.84228 6.71412 1.39979 5.60026 1.39979C4.4864 1.39979 3.41817 1.84228 2.63055 2.62992C1.84293 3.41755 1.40046 4.48581 1.40046 5.5997C1.40046 6.71358 1.84293 7.78185 2.63055 8.56948C3.41817 9.35712 4.4864 9.79961 5.60026 9.79961Z" fill="black"/>
              </svg>
            </a>
          </li>
          <li className="header-user-list__item">
            <Link className="header-user-list__link header-user-list__link--basket" to={Routes.BASKET} aria-label="Корзина">
              <svg className="header-user-list__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13.3798 4.59316C13.3329 4.5283 13.2746 4.47622 13.209 4.44052C13.1434 4.40482 13.072 4.38633 12.9998 4.38634H9.9998V2.02272C9.9998 1.55256 9.84177 1.10167 9.56046 0.769217C9.27916 0.436768 8.89763 0.25 8.4998 0.25H5.4998C5.10198 0.25 4.72045 0.436768 4.43914 0.769217C4.15784 1.10167 3.9998 1.55256 3.9998 2.02272V4.38634H0.999803C0.927326 4.38537 0.855537 4.40303 0.78941 4.43811C0.723283 4.47318 0.664399 4.52483 0.616838 4.58947C0.569277 4.65411 0.534176 4.73019 0.513968 4.81246C0.493759 4.89472 0.488926 4.98119 0.499803 5.06588L1.4398 12.2454C1.47596 12.5272 1.59709 12.7841 1.78085 12.9687C1.96461 13.1533 2.19864 13.2531 2.4398 13.2499H11.5698C11.811 13.2531 12.045 13.1533 12.2288 12.9687C12.4125 12.7841 12.5336 12.5272 12.5698 12.2454L13.4998 5.06588C13.5098 4.98152 13.5043 4.8956 13.4836 4.814C13.4629 4.73241 13.4275 4.65707 13.3798 4.59316ZM4.9998 2.02272C4.9998 1.866 5.05248 1.7157 5.14625 1.60488C5.24002 1.49407 5.36719 1.43181 5.4998 1.43181H8.4998C8.63241 1.43181 8.75959 1.49407 8.85336 1.60488C8.94712 1.7157 8.9998 1.866 8.9998 2.02272V4.38634H4.9998V2.02272ZM11.5698 12.0681H2.4298L1.5848 5.56815H12.4148L11.5698 12.0681Z" fill="black"/>
              </svg>
              <span className="header-user-list__in-basket">2</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className="header__down"></div>
  </header>;
}

export default Header;
