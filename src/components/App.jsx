import React from 'react';
import { AllImages } from '../api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import GlobalStyle from './GlobalStyle';
import './App.styled';
import { AppStyle, NoImageStyle } from './App.styled';

class App extends React.Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    selectedImage: null,
    per_page: 12,
    loadMore: false,
    error: null
  };


  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleClick = (evt) => {
    evt.preventDefault();
    const query = evt.target.elements.query.value.trim();

    if (query !== '') {
      this.setState({ query, images: [], page: 1 });
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    try {
      const imagesSet = await AllImages(query, page);
      const { images, totalHits } = imagesSet;

      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
        loadMore: prevState.page < Math.ceil(totalHits / prevState.per_page),
      }));
    } catch (error) {
      this.setState({error})
    } finally{
      this.setState({loading: false})
    }
   
  }

  handleLoader = () => {
    
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  }

  toggleModal = (selectedImage) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      selectedImage,
    }));
  };

  render() {
    const { loading, images, showModal, selectedImage, loadMore, error } = this.state;

    const renderLoadMoreButton = loadMore && images.length > 0 && !loading;

    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleClick} />
        {images.length > 0 && <ImageGallery images={images} onClick={this.toggleModal} />}
        {loading && <Loader />}
        {error && <NoImageStyle>Sorry, something went wrong</NoImageStyle>}
        {images.length === 0 && <NoImageStyle>No image was found for your request</NoImageStyle>}
        {renderLoadMoreButton && <Button buttonLoadMore={this.handleLoader} />}
        {showModal && (
          <Modal selectedImage={selectedImage} onClose={this.toggleModal} />
        )}
        <GlobalStyle />
      </AppStyle>
    );
  }
}

export default App;
