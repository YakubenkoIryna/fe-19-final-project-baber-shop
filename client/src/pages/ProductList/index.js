import React, {useEffect, useState} from 'react';
import CheckboxFilter from "../../components/CheckboxFilters";
import PriceSlider from "../../components/PriceSlider";
import FilteredProducts from "../../components/FilteredProducts";
import {useDispatch} from "react-redux";
import {showPage} from "../../store/breadcrumbs/crumbsAction";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import queryString from 'query-string';
import './styles.less';

import {useHistory, useLocation} from 'react-router-dom';
import {MetaForFiltered} from "../../components/Helmet";

const perPage = 5;

const ProductList = () => {
  const {search, key} = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(showPage({pageName: 'Shop', key}));
  }, [dispatch, key])

  const query = queryString.parse(search, {arrayFormat: "comma"})
  if (!Object.prototype.hasOwnProperty.call(query, 'perPage')) {
    query.perPage = String(perPage);
  }

  const onLoadMore = () => {
    query.perPage = String(+query.perPage + perPage);
    onQueryChange();
  }

  const stringify = () => {
    return queryString.stringify({
      ...query
    }, {arrayFormat: "comma"});
  }

  const onQueryChange = () => {
    history.push('/shop?' + stringify());
  }

  const catchCheckbox = ({target: {dataset: {type}, id, checked, type: el}}) => {
    if (el === 'checkbox') {
      const values = [].concat((query[type] || []));
      if (checked) {
        values.push(id);
      } else {
        const index = values.indexOf(id);
        if (index > -1) {
          values.splice(index, 1);
        }
      }
      query[type] = values;
      onQueryChange();
    }
  }

  const openFilters = () => {
    setShowFilters(!showFilters);
  }

  const show = showFilters ? 'active' : 'hidden';
  const showButton = {display: showFilters ? 'none' : 'block'}

  return (
    <>
      <MetaForFiltered
        title="Barber Shop Market"
        content="Barber Shop market"
        rel="icon"
      />
      <div className="product-list-container">
        <div className='filters'>
          <div className={"filters-container " + show}>
            <PriceSlider query={query} onChange={onQueryChange}/>
            <CheckboxFilter clickCheckbox={catchCheckbox} query={query}/>
          </div>
          <div className="open-filters-btn-container">
            <button type='button' className='open-filters-btn' style={showButton}
                    onClick={openFilters}>Filter <CaretDownOutlined className='filters-btn-icon'/>
            </button>
            <button type='button' className={'open-filters-btn ' + show}
                    onClick={openFilters}>Filter <CaretUpOutlined className='filters-btn-icon'/>
            </button>
          </div>
        </div>
        <FilteredProducts queryString={stringify()} onLoadMore={onLoadMore}/>
      </div>
    </>
  )
}

export default ProductList;