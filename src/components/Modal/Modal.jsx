import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRef = document.querySelector('#modal');

const Modal = ({ item, onClose }) => {
  useEffect(() => {
    const onEscPress = e => {
      if (e.code !== 'Escape') {
        return;
      }
      onClose();
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [onClose]);

  const onClickBackDrop = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  return createPortal(
    <div className="overlay" onClick={onClickBackDrop}>
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
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.onEscPress);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onEscPress);
//   }

//   onClickBackDrop = e => {
//     if (e.target !== e.currentTarget) {
//       return;
//     }
//     this.props.onClose();
//   };

//   onEscPress = e => {
//     if (e.code !== 'Escape') {
//       return;
//     }
//     this.props.onClose();
//   };

//   render() {
//     return createPortal(
//       <div className="overlay" onClick={this.onClickBackDrop}>
//         {this.props.item.map(({ id, largeImageURL, tags }) => {
//           return (
//             <div className="modal" key={id}>
//               <img src={largeImageURL} alt={tags} />
//             </div>
//           );
//         })}
//       </div>,
//       modalRef,
//     );
//   }
// }

Modal.propTypes = {
  item: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
