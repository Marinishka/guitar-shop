import React, {useState} from 'react';
import PropTypes from 'prop-types';
import GoodsList from '../goods-list/goods-list';
import Pagination from '../pagination/pagination';

function GoodsPagination({data, amountPages}) {
  const [activePage, setActivePage] = useState(1);
  return <>
    <GoodsList activePage={activePage} data={data}/>
    <Pagination amountPages={amountPages} activePage={activePage} setActivePage={setActivePage}/>
  </>;
}

GoodsPagination.propTypes = {
  data: PropTypes.array.isRequired,
  amountPages: PropTypes.number.isRequired
};

export default GoodsPagination;
