import React, {useState} from 'react';
import './styles.less';
import CheckboxFilter from "../../components/CheckboxFilters";
import PriceSlider from "../../components/PriceSlider";
import FilteredProducts from "../../components/FilteredProducts";
import queryString from 'query-string';

import {MetaForFiltered} from "../../components/Helmet"
import {useHistory, useLocation} from "react-router-dom";

const ProductList = () => {
    const [showFilters, setShowFilters] = useState(false);

    const {search} = useLocation();
    const history = useHistory();
    const query = queryString.parse(search, {arrayFormat: "comma"})

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
    const showButton = {display: showFilters ? 'none' : 'inline-block'}

    return (
        <>
            <MetaForFiltered
              title = "Barber Shop Market"
              content = "Barber Shop market"
              rel = "icon"
            />
            <div className="product-list-container">
                <div className={"filters-container " + show}>
                    <PriceSlider query={query} onChange={onQueryChange}/>
                    <CheckboxFilter clickCheckbox={catchCheckbox} query={query}/>
                </div>
                <div className="open-filters-btn-container">
                    <button type='button' className='open-filters-btn' style={showButton} onClick={openFilters}>X</button>
                    <button type='button' className={'open-filters-btn ' + show} onClick={openFilters}>O</button>
                </div>
                <FilteredProducts queryString={stringify()}/>
            </div>
        </>
    )
}

export default ProductList;