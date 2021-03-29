import React from "react";
import './style.less'

const QuerySearch = ({ keyWord, setKeyWord, handleSearch }) => {

  const handleChange = (e) => {
    e.preventDefault();
    setKeyWord(e.target.value.toLowerCase());
  }

  return (
    <form onSubmit={handleSearch} className={'local-search__container'}>
      <input
        type="search"
        placeholder={'input searching value'}
        value={keyWord}
        onChange={handleChange}
        className={'local-search__input'}/>
    </form>
  );
}

export default QuerySearch;