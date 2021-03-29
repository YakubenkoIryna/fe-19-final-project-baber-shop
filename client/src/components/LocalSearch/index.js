import React from "react";
import './style.less'

const LocalSearch = ({ keyWord, setKeyWord }) => {

  const onSearch = (e) => {
    e.preventDefault();
    setKeyWord(e.target.value.toLowerCase());
  }

  return (
    <div className={'local-search__container'}>
      <input
        type="search"
        placeholder={'input searching value'}
        value={keyWord}
        onChange={onSearch}
        className={'local-search__input'}/>
    </div>
  );
}

export default LocalSearch;