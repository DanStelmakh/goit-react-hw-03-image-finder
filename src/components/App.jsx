import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from 'Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    //  isLoading: false,
    //  modalImage: '',
    //  showModal: false,
    totalHits: 0,
  };
  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page)
      // this.setState({ isLoading: true });
      fetchImages(query, page).then(data => {
        this.setState(prevState => ({
          images:
            page === 1 ? [...data.hits] : [...prevState.images, ...data.hits],
          totalHits:
            page === 1
              ? data.totalHits - data.hits.length
              : data.totalHits - [...prevState.images, ...data.hits].length,
        }));
      });
    // .finally(() => {
    //   this.setState({ isLoading: false });
    // });
  };
  handleSubmit = query => {
    this.setState({ query });
  };
  render() {
    const { images } = this.state;
    const { handleSubmit } = this;
    return (
      <>
        <SearchBar onSubmit={handleSubmit} />
        <ImageGallery images={images} />
      </>
    );
  }
}
