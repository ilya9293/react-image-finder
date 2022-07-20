import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ data }) {
  return (
    <ul className="gallery">
      {data.map(({ id, webformatURL, tags }) => {
        return (
          <li className="gallery-item" key={id}>
            <ImageGalleryItem src={webformatURL} alt={tags} />
          </li>
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ImageGallery;
