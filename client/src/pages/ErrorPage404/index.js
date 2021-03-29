import React from 'react';
import './styles.less';
import {Result} from 'antd';
import {useHistory} from "react-router";

const Btn = () => {
    const history = useHistory();

    return (
        <button type='primary' onClick={() => {
            history.goBack()
        }}> Go back</button>
    );
}
const ErrorPage = () => {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Something went wrong, boy"
                extra={<Btn/>}
            />
        </>
    );
}
export default ErrorPage;