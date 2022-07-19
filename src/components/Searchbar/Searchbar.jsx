import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

function Searchbar({ onSubmit, query, onChange }) {
  return (
    <header className="searchbar">
      <form onSubmit={onSubmit} className="form">
        <button type="submit" className="button">
          <span className="buttonlabel"></span>
          <AiOutlineSearch />
        </button>

        <input
          onChange={onChange}
          value={query}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default Searchbar;
