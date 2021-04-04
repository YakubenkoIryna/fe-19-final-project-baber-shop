import React, {useEffect, useState} from "react";
import {Layout, Typography} from "antd";
import {Redirect, useParams} from "react-router";
import Ajax from "../../services/Ajax";
import parse from 'html-react-parser';
import {useDispatch} from "react-redux";
import {showPage} from "../../store/breadcrumbs/crumbsAction";
import './styles.less'

const {Content} = Layout;
const {Title} = Typography;
const {get} = Ajax;


const StaticPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const [page, setPage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    get(`/pages/${encodeURIComponent(id)}`)
      .then(page => {
        setPage(page);

        const parentPages = page.customId.split('/');
        const currentPage = parentPages.pop();

        let result = '/pages/';
        const pathNames = parentPages.map(page => result += `${page}`);

        dispatch(showPage({pageName: currentPage, parentPages, pathNames, key: page._id}));
      })
      .catch(err => {
        console.log(err)
        setPage(null)
        setError(true)
      });

  }, [id, dispatch])

  return (
    <>
      {page !== null ?
        <Content className='staticPage-container'>
          <Title>{page.title}</Title>
          {parse(page.htmlContent)}
        </Content>
        : error
          ? <Redirect to={'/error'}/>
          : ''
      }
    </>
  )
}

export default StaticPage;

