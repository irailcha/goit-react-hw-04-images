import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Modal.styled';
import {Overlay, ModalStyle} from "./Modal.styled";


const Modal = ({selectedImage, onClose}) => {


  useEffect(() => {
    const handleKeyDown = evt =>{
      if(evt.code ==='Escape'){
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);


    return () => {
    window.removeEventListener('keydown', handleKeyDown);}
  }, [onClose])


  

  const  handleBackdropClick = (evt) => { 

    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };


    return (
      <Overlay className="Overlay" onClick={handleBackdropClick}>
        <ModalStyle className="modal">
        <img src={selectedImage} alt="Large preview" />
        </ModalStyle>
      </Overlay>
    );

    
};

Modal.propTypes = {
    selectedImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default Modal;