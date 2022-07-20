import React from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ src, alt }) {
  return <img src={src} alt={alt} />;
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ImageGalleryItem;
