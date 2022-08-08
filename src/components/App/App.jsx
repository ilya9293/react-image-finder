import Searchbar from '../Searchbar';
import { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BallTriangle } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import Modal from 'components/Modal';

const App = () => {
  const [page, setPage] = useState(null);
  const [per_page] = useState(12);
  const [data, setData] = useState([]);
  const [largeImg, setLargeImg] = useState([]);
  const [query, setQuery] = useState('');
  const [error] = useState('Something went wrong');
  const [isLoading, setIsLoading] = useState(false);
  const [isQuantityItems, setIsQuantityItems] = useState(true);
  const [isOpenLargeImg, setisOpenLargeImg] = useState(false);

  const APIKEY = '26909021-bb302c7a297d7b4d207aa52f9';
  const BASE_URL = 'https://pixabay.com/api/';

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    const getUrlParams = () => {
      const urlParams = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        q: query,
        page: page,
        per_page: per_page,
        key: APIKEY,
      });
      return urlParams;
    };
    const url = getUrlParams();

    const fetchImages = async url => {
      try {
        const data = await api(`${BASE_URL}?${url}`);
        if (!data.total) {
          throw new Error('Not Found');
        }
        renderButton(data.total);
        setData(prevData => [...prevData, ...data.hits]);
      } catch (err) {
        notify(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages(url);

    const renderButton = data => {
      const quantity = Math.ceil(data / per_page);
      if (page >= quantity) {
        setIsQuantityItems(false);
      }
    };
  }, [page, per_page, query]);

  const clickSubmit = value => {
    if (!value) {
      notify('The string is empty. Enter your request!');
      return;
    }
    if (value === query) {
      notify('The same request. Please, change!');
      return;
    }
    setPage(1);
    setQuery(value);
    setData([]);
    setIsQuantityItems(true);
  };

  const notify = msg => toast(msg);

  const clickLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const fetchLargeImg = async id => {
    const urlParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      id,
      key: APIKEY,
    });
    setisOpenLargeImg(true);
    try {
      const data = await api(`${BASE_URL}?${urlParams}`);
      setLargeImg(data.hits);
    } catch (err) {
      alert(error);
    }
  };

  const сloseModal = () => {
    setisOpenLargeImg(false);
    setLargeImg([]);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={clickSubmit} />
      {!!data.length && <ImageGallery data={data} onClick={fetchLargeImg} />}
      {isLoading && (
        <BallTriangle
          color="#00BFFF"
          height={180}
          width={180}
          wrapperClass={'loading'}
        />
      )}
      {!!data.length && isQuantityItems && <Button onClick={clickLoadMore} />}
      {isOpenLargeImg && <Modal item={largeImg} onClose={сloseModal} />}
      <ToastContainer />
    </div>
  );
};

// class App extends Component {
//   state = {
//     page: null,
//     per_page: 12,
//     data: [],
//     largeImg: [],
//     query: '',
//     error: 'Something went wrong',
//     isLoading: false,
//     isQuantityItems: true,
//     isOpenLargeImg: false,
//   };

//   APIKEY = '26909021-bb302c7a297d7b4d207aa52f9';
//   BASE_URL = 'https://pixabay.com/api/';

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.page !== prevState.page ||
//       this.state.query !== prevState.query
//     ) {
//       this.setState({ isLoading: true });
//       const url = this.getUrlParams();
//       this.fetchImages(url);
//     }
//   }

//   fetchImages = async url => {
//     try {
//       const data = await api(`${this.BASE_URL}?${url}`);
//       if (!data.total) {
//         throw new Error('Not Found');
//       }
//       this.renderButton(data.total);
//       this.setState(prevState => {
//         return { data: [...prevState.data, ...data.hits] };
//       });
//     } catch (err) {
//       this.notify(err.message);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   renderButton = data => {
//     const { per_page, page } = this.state;
//     const quantity = Math.ceil(data / per_page);
//     if (page >= quantity) {
//       this.setState({ isQuantityItems: false });
//     }
//   };

//   getUrlParams = () => {
//     const urlParams = new URLSearchParams({
//       image_type: 'photo',
//       orientation: 'horizontal',
//       q: this.state.query,
//       page: this.state.page,
//       per_page: this.state.per_page,
//       key: this.APIKEY,
//     });
//     return urlParams;
//   };

//   clickSubmit = query => {
//     if (!query) {
//       this.notify('The string is empty. Enter your request!');
//       return;
//     }
//     if (query === this.state.query) {
//       this.notify('The same request. Please, change!');
//       return;
//     }
//     this.setState({ page: 1, query, data: [], isQuantityItems: true });
//   };

//   notify = msg => toast(msg);

//   clickLoadMore = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1 };
//     });
//   };

//   fetchLargeImg = async id => {
//     const urlParams = new URLSearchParams({
//       image_type: 'photo',
//       orientation: 'horizontal',
//       id,
//       key: this.APIKEY,
//     });
//     this.setState({ isOpenLargeImg: true });
//     try {
//       const data = await api(`${this.BASE_URL}?${urlParams}`);
//       this.setState({ largeImg: data.hits });
//     } catch (err) {
//       alert(this.state.error);
//     }
//   };

//   сloseModal = () => {
//     this.setState({ isOpenLargeImg: false, largeImg: [] });
//   };

//   render() {
//     const { data, isLoading, isQuantityItems, isOpenLargeImg, largeImg } =
//       this.state;

//     return (
//       <div className="app">
//         <Searchbar onSubmit={this.clickSubmit} />
//         {!!data.length && (
//           <ImageGallery data={data} onClick={this.fetchLargeImg} />
//         )}
//         {isLoading && (
//           <BallTriangle
//             color="#00BFFF"
//             height={180}
//             width={180}
//             wrapperClass={'loading'}
//           />
//         )}
//         {!!data.length && isQuantityItems && (
//           <Button onClick={this.clickLoadMore} />
//         )}
//         {isOpenLargeImg && <Modal item={largeImg} onClose={this.сloseModal} />}
//         <ToastContainer />
//       </div>
//     );
//   }
// }

export default App;
