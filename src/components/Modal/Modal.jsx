import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRef = document.querySelector('#modal');

function Modal({ item }) {
  return createPortal(
    <div className="overlay">
      {item.map(({ id, largeImageURL, tags }) => {
        return (
          <div className="modal" key={id}>
            <img src={largeImageURL} alt={tags} />
          </div>
        );
      })}
    </div>,
    modalRef,
  );
}

Modal.propTypes = {
  item: PropTypes.array.isRequired,
};

export default Modal;
