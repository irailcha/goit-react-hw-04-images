import React from 'react';
import PropTypes from 'prop-types';
import './Modal.styled';
import {Overlay, ModalStyle} from "./Modal.styled";


class Modal extends React.Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
}
  
  componentWillUnmount() {
  window.removeEventListener('keydown', this.handleKeyDown);
  }


  handleKeyDown = evt =>{
    if(evt.code ==='Escape'){
      this.props.onClose();
    }
  }

  handleBackdropClick = (evt) => { 

    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    
    const { selectedImage } = this.props;
    return (
      <Overlay className="Overlay" onClick={this.handleBackdropClick}>
        <ModalStyle className="modal">
        <img src={selectedImage} alt="Large preview" />
        </ModalStyle>
      </Overlay>
    );
  }
    
};

Modal.propTypes = {
    selectedImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default Modal;