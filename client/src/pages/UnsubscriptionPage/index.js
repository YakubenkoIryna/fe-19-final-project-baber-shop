import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import queryString from 'query-string';
import MailService from "../../services/MailService";
import {CheckOutlined, MehOutlined} from "@ant-design/icons";
import './styles.less';
import Preloader from "../../components/Preloader";

const UnsubscriptionPage = () => {
    const location = useLocation();
    const [state, setState] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const query = queryString.parse(location.search);
        MailService.unsubscribe(query.email, query.check)
            .then(res => isMounted && setState(res))
        return () => {
            isMounted = false
        };
    }, [location]);

    return (
        <div className='unsubscribe'>
            {
                state !== null ?
                    state ?
                        <>
                            <CheckOutlined className='icon icon-good'/>
                            All good!
                        </>
                        :
                        <>
                            <MehOutlined className='icon icon-bad'/>
                            Sorry, you went to the wrong place.
                        </>
                    : <Preloader/>
            }
        </div>
    );
}

export default UnsubscriptionPage;