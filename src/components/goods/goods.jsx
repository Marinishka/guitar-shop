import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Sort from '../sort/sort';
import GoodsList from '../goods-list/goods-list';
import Pagination from '../pagination/pagination';
import data from '../../data';
import {ORDERS_IN_LIST} from '../../const';
import {fetchGuitars} from '../../store/action';

function Goods({onSetPopupOpen}) {
  const [activePage, setActivePage] = useState(1);
  const [amountPages, setAmountPages] = useState(0);

  const filteredGuitars = useSelector((state) => state.LOCAL.filteredGuitars);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuitars(data));
    setAmountPages(Math.ceil(data.length / ORDERS_IN_LIST));
  }, []);

  useEffect(() => {
    setAmountPages(Math.ceil(filteredGuitars.length / ORDERS_IN_LIST));
  }, [filteredGuitars]);

  return <div className="catalog__goods">
    <Sort/>
    {filteredGuitars.length > 0 ? <GoodsList activePage={activePage} onSetPopupOpen={onSetPopupOpen}/> : <div className="basket">Нет подходящих гитар. Попробуйте изменить настройки поиска</div>}
    {amountPages > 1 ? <Pagination amountPages={amountPages} activePage={activePage} onSetActivePage={setActivePage}/> : ``}
  </div>;
}

Goods.propTypes = {
  onSetPopupOpen: PropTypes.func.isRequired
};

export default Goods;
