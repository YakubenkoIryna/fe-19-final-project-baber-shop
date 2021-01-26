import React, {useState, useEffect} from 'react';
import './styles.less';
import CheckboxItem from "./CheckboxItem";
import Ajax from "../../services/Ajax";
import {useSelector, useDispatch} from "react-redux";
import {checkboxFilterAdd, checkboxFilterDelete} from "../../store/checkboxFilters/checkboxFiltersAction";

const CheckboxFilter = (props) => {

    const [filtersFromDB, setFiltersFromDB] = useState([]);
    const filtersRedux = useSelector(state => state.filters.filters);
    const dispatch = useDispatch();
    console.log('from redux--->>', filtersRedux);

    useEffect(() => {
        async function fetch() {
            const {data} = await Ajax.get('/filters');
            setFiltersFromDB(data);
        }

        fetch()
    }, []);

    // const filters = [...filtersFromDB].map(item => {
    //     return {
    //         type: item.type,
    //         name: item.name
            // id: item._id
        // }
    // });

    console.log('filters ----->>', filtersFromDB);

    const catchCheckbox = (e) => {
        if (e.target.type === 'checkbox') {
            const index = filtersRedux.findIndex(item => item.name === e.target.name);
            const el = {type: e.target.dataset.type, name: e.target.name};
            if (index < 0) {
                dispatch(checkboxFilterAdd(el));
            } else {
                dispatch(checkboxFilterDelete(el));
            }
        }
    }

    return (
        <div className='checkbox-container' onClick={catchCheckbox}>
            {
                filtersFromDB.map(item =>
                        // <div className='checkbox-group__item'>
                        <CheckboxItem type={item.type} name={item.name} key={item.name}/>
                    // </div>
                )
            }
        </div>
    )
}
export default CheckboxFilter;