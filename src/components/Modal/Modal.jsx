import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRef = document.querySelector('#modal');

function Modal(props) {
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <img src="" alt="" />
      </div>
    </div>,
    modalRef,
  );
}

Modal.propTypes = {};

export default Modal;
