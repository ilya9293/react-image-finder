import React from 'react';
import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <button onClick={onClick} type="button" className="loadmore">
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
