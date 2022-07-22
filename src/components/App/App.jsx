import Searchbar from '../Searchbar';
import { Component } from 'react';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BallTriangle } from 'react-loader-spinner';
import api from '../../services/api';
import Modal from 'components/Modal';

class App extends Component {
  state = {
    page: null,
    per_page: 12,
    data: [],
    query: '',
    isLoading: false,
    isQuantityItems: true,
  };

  APIKEY = '26909021-bb302c7a297d7b4d207aa52f9';
  BASE_URL = 'https://pixabay.com/api/';

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ isLoading: true });
      const url = this.getUrlParams();

      try {
        const data = await api(`${this.BASE_URL}?${url}`);
        if (!data.total) {
          throw new Error('Not Found');
        }
        this.renderButton(data.total);
        this.setState(prevState => {
          return { data: [...prevState.data, ...data.hits] };
        });
      } catch (err) {
        alert(`${err}. Change your request!`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  renderButton = data => {
    const { per_page, page } = this.state;
    const quantity = Math.ceil(data / per_page);
    if (page >= quantity) {
      this.setState({ isQuantityItems: false });
    }
  };

  getUrlParams = () => {
    const urlParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.state.query,
      page: this.state.page,
      per_page: this.state.per_page,
      key: this.APIKEY,
    });
    return urlParams;
  };

  clickSubmit = query => {
    if (query === this.state.query) {
      alert('The same request. Please, change!');
      return;
    }
    this.setState({ page: 1, query, data: [], isQuantityItems: true });
  };

  clickLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  fetchLargeImg = async id => {
    const urlParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      id,
      key: this.APIKEY,
    });
    const data = await api(`${this.BASE_URL}?${urlParams}`);
    console.log(data.hits);
  };

  render() {
    const { data, isLoading, isQuantityItems } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.clickSubmit} />
        {!!data.length && (
          <ImageGallery data={data} onClick={this.fetchLargeImg} />
        )}
        {isLoading && (
          <BallTriangle
            color="#00BFFF"
            height={180}
            width={180}
            wrapperClass={'loading'}
          />
        )}
        {!!data.length && isQuantityItems && (
          <Button onClick={this.clickLoadMore} />
        )}
        {/* <Modal /> */}
      </div>
    );
  }
}

export default App;
