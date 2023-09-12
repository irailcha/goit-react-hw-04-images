import React from 'react';
import PropTypes from 'prop-types';

import './ImageGalleryItem.styled';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';


const ImageGalleryItem =({src, alt = '', onClick }) =>{
return(
    <GalleryItem className="gallery-item" onClick={onClick}>
  <GalleryImage src={src} alt={alt} />
</GalleryItem>
)

};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default ImageGalleryItem;