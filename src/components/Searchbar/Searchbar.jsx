import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setQuery('');
    return onSubmit(query.toLowerCase().trim());
  };

  return (
    <header className="searchbar">
      <form onSubmit={handleSubmit} className="form">
        <button type="submit" className="button">
          <span className="buttonlabel"></span>
          <AiOutlineSearch />
        </button>

        <input
          onChange={e => setQuery(e.target.value)}
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
};

// class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleChange = e => {
//     this.setState({ query: e.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.setState({ query: '' });
//     return this.props.onSubmit(this.state.query.toLowerCase().trim());
//   };

//   render() {
//     return (
//       <header className="searchbar">
//         <form onSubmit={this.handleSubmit} className="form">
//           <button type="submit" className="button">
//             <span className="buttonlabel"></span>
//             <AiOutlineSearch />
//           </button>

//           <input
//             onChange={this.handleChange}
//             value={this.state.query}
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
