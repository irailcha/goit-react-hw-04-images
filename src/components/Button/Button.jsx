import React from "react";
import PropTypes from 'prop-types';

import './Button.styled';
import { ButtonStyle } from './Button.styled';


const Button = ({ buttonLoadMore }) => (
  <ButtonStyle type="button" onClick={buttonLoadMore}>
    Load more
  </ButtonStyle>
);

Button.propTypes = {
  buttonLoadMore: PropTypes.func.isRequired,
};

export default Button;
