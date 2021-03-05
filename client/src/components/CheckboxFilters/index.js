import React, {useEffect, useState} from 'react';
import CheckboxItem from "./CheckboxItem";
import Ajax from "../../services/Ajax";
import './styles.less';

const CheckboxFilter = ({clickCheckbox, query}) => {

    const [filters, setFilters] = useState([]);
    const [catalog, setCatalog] = useState([]);

    useEffect(() => {
        async function fetch() {
            const result = (await Ajax.get('/catalog'))
                .filter(item => item.level === "3")
            setCatalog(result);
        }

        fetch()
    }, []);
    useEffect(() => {
        async function fetch() {
            const result = (await Ajax.get('/filters'))
                .map(item => item.type)
                .filter((v, i, a) => a.indexOf(v) === i)
                .map(async type => {
                    const result = await Ajax.get(`/filters/${type}`);
                    return {
                        type,
                        values: result
                    }
                });

            setFilters(await Promise.all(result));
        }

        fetch()
    }, []);

    return (
        <div className='checkbox-container'>
            <div className='checkbox-group checkbox-catalog-group'>
                <p className='checkbox-group__name'>Catalog</p>
                {
                    catalog.map(category =>
                        <CheckboxItem key={category.id}
                                      type={'categories'}
                                      checked={query.categories?.includes(category.name) || false}
                                      id={category.name}
                                      name={category.name}
                                      onChange={clickCheckbox}/>
                    )
                }
            </div>
            {
                filters.map(filter =>
                    <div key={filter.type} className='checkbox-group'>
                        <p className='checkbox-group__name'>{filter.type.charAt(0).toUpperCase() + filter.type.slice(1)}</p>
                        {filter.values
                            .map(item => item.name)
                            .map(item =>
                            <CheckboxItem key={item}
                                          type={filter.type}
                                          checked={query[filter.type]?.includes(item) || false}
                                          id={item}
                                          name={(item.charAt(0).toUpperCase() + item.slice(1)).replaceAll(/_/g, ' ')}
                                          onChange={clickCheckbox}/>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default CheckboxFilter;