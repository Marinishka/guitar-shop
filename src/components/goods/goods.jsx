import React, {useState} from 'react';
import PropTypes from 'prop-types';
import GoodsList from '../goods-list/goods-list';
import Pagination from '../pagination/pagination';

function Goods({data, amountPages, setPopupOpen}) {
  const [activePage, setActivePage] = useState(1);
  return <>
    <GoodsList activePage={activePage} data={data} setPopupOpen={setPopupOpen}/>
    <Pagination amountPages={amountPages} activePage={activePage} setActivePage={setActivePage}/>
  </>;
}

Goods.propTypes = {
  data: PropTypes.array.isRequired,
  amountPages: PropTypes.number.isRequired,
  setPopupOpen: PropTypes.func.isRequired
};

export default Goods;
