import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import GoodsList from '../goods-list/goods-list';
import Pagination from '../pagination/pagination';
import data from '../../data';
import {ORDERS_IN_LIST} from '../../const';
import {useDispatch} from 'react-redux';
import {fetchGuitars} from '../../store/action';

function Goods({setPopupOpen}) {
  const [activePage, setActivePage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuitars(data));
  }, []);

  const amountPages = Math.ceil(data.length / ORDERS_IN_LIST);

  return <>
    <GoodsList activePage={activePage} data={data} setPopupOpen={setPopupOpen}/>
    <Pagination amountPages={amountPages} activePage={activePage} setActivePage={setActivePage}/>
  </>;
}

Goods.propTypes = {
  setPopupOpen: PropTypes.func.isRequired
};

export default Goods;
