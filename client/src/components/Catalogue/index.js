import React, {useState, useEffect} from "react";
import './styles.less';
import CategoryService from "../../services/CategoryService";
import {Link} from "react-router-dom";
import {iconCatalogue} from "../Header/img";
import {CaretRightOutlined,ForwardOutlined } from '@ant-design/icons';
import {Menu} from 'antd';

const {SubMenu} = Menu;

const Catalogue = () => {

    const [openKeys, setOpenKeys] = useState([]);
    const [sortedCategories, setSortedCategories] = useState([]);
    const rootSubmenuKeys = sortedCategories.map((item, index) => `sub${index}`);

    const [visible, setVisible] = React.useState('none');
    const showCatalogue = () => {
        setVisible(() => visible === 'none' ? 'block' : 'none')
    };

    useEffect(() => {
        CategoryService.getCategoriesNestedByLevels()
            .then(result => setSortedCategories(result))
            .catch(err => console.log('error ---> ', err))
    }, [])

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const handleCategoryClick = ({key}) => {
        console.log('click', key);
        setVisible('none')

    }

    const categoriesCatalogue = sortedCategories.map((topLevelCategory, index) => {
        return (
            <SubMenu key={'sub' + index} title={topLevelCategory.name} icon={<CaretRightOutlined />}
                     className='catalogue-item'>
                {topLevelCategory.childLevel.map(nestedLevel => {
                    if (nestedLevel.childLevel) {
                        return (
                            <SubMenu key={nestedLevel.id} title={nestedLevel.name} icon={<ForwardOutlined />}
                                     className='catalogue-item'>
                                {nestedLevel.childLevel.map(menuItem => {
                                    return (
                                        <Menu.Item key={menuItem.id}
                                                   className='catalogue-menu-item'>
                                            <Link to='/shop'>{menuItem.name}</Link>
                                        </Menu.Item>
                                    )
                                })}
                            </SubMenu>
                        )
                    } else {
                        return (
                            <Menu.Item key={nestedLevel.id}
                                       className='catalogue-menu-item'>
                                <Link to='/shop'>{nestedLevel.name}</Link>
                            </Menu.Item>
                        )
                    }
                })}
            </SubMenu>
        )
    })

    return (
        <div className="catalogue-wrapper">
            <button className='catalogue-btn' onClick={showCatalogue}>
                <img className="catalogue-btn-img" src={iconCatalogue} alt="icon"/>
                <span className="catalogue-btn-text">Catalogue</span>
            </button>
            <Menu mode='inline'
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  onClick={handleCategoryClick}
                  style={{display: visible}}
                  className='catalogue-menu'>
                {categoriesCatalogue}
            </Menu>
        </div>
    )
}


export default Catalogue