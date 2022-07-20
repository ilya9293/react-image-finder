import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import ImageGallery from '../ImageGallery';
import Button from 'components/Button';

class App extends Component {
  state = {
    page: null,
    data: [],
  };

  APIKEY = '26909021-bb302c7a297d7b4d207aa52f9';
  BASE_URL = 'https://pixabay.com/api/';

  getUrlParams = query => {
    const urlParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: query,
      page: this.state.page,
      per_page: 12,
      key: this.APIKEY,
    });
    return urlParams;
  };

  clickSubmit = async query => {
    this.setState({ page: 1 });
    const url = this.getUrlParams(query);
    const response = await fetch(`${this.BASE_URL}?${url}`);
    const data = await response.json();
    this.setState({ data: data.hits });
  };

  clickLoadMore = async () => {
    this.setState(prevState => {
      prevState.page += 1;
    });
    const url = this.getUrlParams();
    const response = await fetch(`${this.BASE_URL}?${url}`);
    const data = await response.json();
    console.log(data);
    //  this.setState(prevState => ({
    //    [...prevState.data, data];
    //  }));
  };

  render() {
    const { data } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.clickSubmit} />
        {!!data.length && <ImageGallery data={data} />}
        {!!data.length && <Button />}
      </div>
    );
  }
}

export default App;
