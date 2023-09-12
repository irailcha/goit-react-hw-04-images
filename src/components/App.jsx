import React, { useState, useEffect } from 'react';
import { AllImages } from '../api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import GlobalStyle from './GlobalStyle';
import { AppStyle, NoImageStyle } from './App.styled';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [, setPer_page] = useState(12);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
  
    const fetchImages = async () => {
      try {
        setLoading(true);
  
        const imagesSet = await AllImages(query, page);
        const { images, totalHits } = imagesSet;
  
        setImages(prevImages => [...prevImages, ...images]);
        setLoadMore(page < Math.ceil(totalHits /setPer_page));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchImages();
  }, [query, page]);
  
  const handleClick = (evt) => {
    evt.preventDefault();
    const query = evt.target.elements.query.value.trim();

    if (query !== '') {
      setQuery(query);
      setImages([]);
      setPage(1);
    }
  };



  const handleLoader = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (selectedImage) => {
    setShowModal(prevState => !prevState.showModal);
    setSelectedImage(selectedImage);
  };

  const renderLoadMoreButton = loadMore && images.length > 0 && !loading;

  return (
    <AppStyle>
      <Searchbar onSubmit={handleClick} />
      {images.length > 0 && <ImageGallery images={images} onClick={toggleModal} />}
      {loading && <Loader />}
      {error && <NoImageStyle>Sorry, something went wrong</NoImageStyle>}
      {images.length === 0 && <NoImageStyle>No image was found for your request</NoImageStyle>}
      {renderLoadMoreButton && <Button buttonLoadMore={handleLoader} />}
      {showModal && (
        <Modal selectedImage={selectedImage} onClose={toggleModal} />
      )}
      <GlobalStyle />
    </AppStyle>
  );
};

export default App;
