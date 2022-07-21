import Searchbar from '../Searchbar';
import { Component } from 'react';
import ImageGallery from '../ImageGallery';
import Button from '../Button';

class App extends Component {
  state = {
    page: null,
    data: [],
    query: '',
  };

  APIKEY = '26909021-bb302c7a297d7b4d207aa52f9';
  BASE_URL = 'https://pixabay.com/api/';

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      const url = this.getUrlParams();
      const response = await fetch(`${this.BASE_URL}?${url}`);
      const data = await response.json();
      this.setState(prevState => {
        return { data: [...prevState.data, data.hits] };
      });
    }
  }

  getUrlParams = () => {
    const urlParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this.state.query,
      page: this.state.page,
      per_page: 12,
      key: this.APIKEY,
    });
    return urlParams;
  };

  clickSubmit = query => {
    this.setState({ page: 1, query });
  };

  clickLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { data } = this.state;
    console.log(data);

    return (
      <div className="app">
        <Searchbar onSubmit={this.clickSubmit} />
        {!!data.length && <ImageGallery data={data} />}
        {!!data.length && <Button onClick={this.clickLoadMore} />}
      </div>
    );
  }
}

export default App;
