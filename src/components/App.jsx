import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from 'Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadMore } from './LoadMore/LoadMore';
import { LoadSpinner } from './LoadSpinner/LoadSpinner';
export class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    modalImage: '',
    showModal: false,
    totalHits: 0,
    total: 0,
  };
  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (page !== 1) {
      this.scrollOnLoadButton();
    }
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      fetchImages(query, page)
        .then(data => {
          this.setState(prevState => ({
            images:
              page === 1 ? [...data.hits] : [...prevState.images, ...data.hits],
            totalHits:
              page === 1
                ? data.totalHits - data.hits.length
                : data.totalHits - [...prevState.images, ...data.hits].length,
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };
  // Открытие/закрытие модалки
  toggleModal = modalImage => {
    if (!modalImage) {
      this.setState({ modalImage: '', showModal: false });
      return;
    }
    this.setState({ modalImage, showModal: true });
  };
  // Сабмит формы
  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };
  // Загрузить больше
  handleLoadMoreImg = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };
  //Скрол по нажатию на кнопку
  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, showModal, isLoading, modalImage, totalHits } = this.state;
    const { handleSubmit, toggleModal, handleLoadMoreImg } = this;

    return (
      <>
        <SearchBar onSubmit={handleSubmit} />
        <ImageGallery images={images} openModal={toggleModal} />
        {showModal && (
          <Modal closeModal={toggleModal} modalImage={modalImage} />
        )}

        {!!totalHits && !isLoading && (
          <LoadMore onLoadMore={handleLoadMoreImg} />
        )}
        {isLoading && <LoadSpinner />}
      </>
    );
  }
}
