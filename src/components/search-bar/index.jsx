import React from 'react';
import isEmpty from 'lodash/isEmpty';

import { SEARCH_PLACEHOLDER } from '../../config/strings';

import { StyledSearchInput } from './styles';

const SearchBar = ({ setKeyword }) => {
  const changeValue = (event) => {
    if (isEmpty(event.target.value)) setKeyword('');
    else setKeyword(event.target.value);
  };

  const handleSearch = (event) => {
    if (!isEmpty(event.target.value) || event.key === 'Enter') {
      setKeyword(event.target.value);
    }
  };

  return (
    <StyledSearchInput
      type="search"
      name="search"
      placeholder={SEARCH_PLACEHOLDER}
      onChange={changeValue}
      onKeyPress={handleSearch}
    />
  );
};

export default SearchBar;
