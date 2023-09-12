import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";


import './ImageGallery.styled';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images , onClick }) => {
  return (
    <Gallery className="gallery">
      {images.map(({id, webformatURL,  largeImageURL}) => (
  <ImageGalleryItem
    key={id}
    src={webformatURL}
    alt=''
    onClick={() => onClick(largeImageURL)}
  />
))}

    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
