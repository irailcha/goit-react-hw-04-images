import React from "react";
import PropTypes from 'prop-types';
import './Searchbar.styled';
import {
  SearchbarHeader, 
  SearchForm, 
  SearchFormButton, 
  SearchFormButtonLabel, 
  SearchFormInput
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({onSubmit}) => {
  return (
    <SearchbarHeader className="searchbar">
      <SearchForm className="form" onSubmit={onSubmit}>
        <SearchFormButton type="submit" className="button">
        <SearchFormButtonLabel className="button-label">
        <FaSearch />
          </SearchFormButtonLabel>

        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
