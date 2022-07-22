import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { Component } from 'react';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <header className="searchbar">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.setState({ query: '' });
            return this.props.onSubmit(this.state.query.toLowerCase().trim());
          }}
          className="form"
        >
          <button type="submit" className="button">
            <span className="buttonlabel"></span>
            <AiOutlineSearch />
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.query}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
