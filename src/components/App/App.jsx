import Searchbar from 'components/Searchbar';
import { Component } from 'react';

class App extends Component {
  state = {
    page: 1,
    query: '',
  };

  APIKEY = '26909021-bb302c7a297d7b4d207aa52f9';
  BASE_URL = 'https://pixabay.com/api/';

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

  clickSubmit = async e => {
    e.preventDefault();
    const url = this.getUrlParams();

    const response = await fetch(`${this.BASE_URL}?${url}`);
    const res = await response.json();
    console.log(res);
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <div className="app">
        <Searchbar
          onSubmit={this.clickSubmit}
          onChange={this.handleChange}
          query={this.state.query}
        />
      </div>
    );
  }
}

export default App;
