import { useState, useEffect } from "react";
import ButtonLoadMore from "./Button/Button";

import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import {searchImg} from "../service/pixaby-api";

const App = ()=>{

const [gallery,setGallery] = useState([]);
const [error, setError] = useState(null);
const [page, setPage] = useState(1);
const [nameImg, setNameImg] = useState('');
const [showModal, setShowModal] = useState(false);
const [url, setUrl] = useState('');
const [tags, setTags] = useState('');
const [loading, setLoading] = useState(false);
const [total, setTotal] = useState(0);

useEffect(() =>{
  if (nameImg) {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await searchImg(nameImg, page);
        if(data.hits.length === 0){
            return alert ('What you are looking for was not found')
          }
        
        setGallery(gallery => [...gallery, ...data.hits]);
        setTotal(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }
}, [nameImg, page]);

const modalClose = e => {
  if (e.code === 'Escape' || e.currentTarget === e.target) {
    setShowModal(prev => !prev);
    setUrl('');
    setTags('');
  }
};
const totalPage = Math.ceil(total / 12);

const loaderMore = () => {
  setPage(prevState => prevState + 1);
};

const modalOpen = (url, tags) => {
  setShowModal(prev => !prev);
  setUrl(url);
  setTags(tags);
};

const searchInput = name => {
  if (name === nameImg) {
    return;
  }
  setNameImg(name);
  setGallery([]);
  setPage(1);
};

 return (
      <div>
        <Searchbar onSubmit={searchInput} />
        <ImageGallery onClick={modalOpen} gallery={gallery} />
        
        {error && <h2 >{error}</h2>}
        {loading && <Loader/>}

        {(Boolean(gallery.length) && page < totalPage)&& <ButtonLoadMore loader={loaderMore} type="button" />}
        {showModal && (
          <Modal onClose={modalClose}>
            <img src={url} alt={tags} />
          </Modal>
        )}
      </div>
    );
  }
export default App;
// class App extends Component {
//   state = {
//     gallery: [],
//     error: null,
//     page: 1,
//     nameImg: '',
//     showModal: false,
//     url: '',
//     tags: '',
//     loading: false,
//     total: 0,
//   };

//   componentDidUpdate(_, prevState) {
//     const { nameImg, page } = this.state;
    
//     if (nameImg !== prevState.nameImg || page !== prevState.page) {
//       this.setState({ loading: true });
//       this.fetchImg();
//     } 

// // return alert ('write corect name img or photo')
//   }

//   async fetchImg() {
//     try {
//       const { nameImg, page } = this.state;
//       const data = await searchImg(nameImg, page);

//       this.setState(({ gallery }) => {
//         // console.log(data.hits.length)
//         if(data.hits.length === 0){
//           return alert ('What you are looking for was not found')
//         }
//         return {
//           gallery: [...gallery, ...data.hits],
//           total: data.totalHits,
//         };
//       });
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }
//   loaderMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   modalOpen = (url, tags) => {
//     this.setState(prev => ({ showModal: !prev.showModal, url, tags }));
//   };

//   modalClose = e => {
//     if (e.code === 'Escape' || e.currentTarget === e.target) {
//       this.setState(prev => ({ showModal: !prev.showModal }));
//     }
//   };
//   searchInput = nameImg => {
//     if(nameImg === this.state.nameImg) {
//       return;
//     }
//     this.setState({ nameImg, gallery: [], page: 1 });
//   };

//   render() {
//     const { gallery, error, showModal, url, tags, loading, total, page } = this.state;
//     const totalPage = Math.ceil(total / 12);
   
//     return (
//       <div>
//         <Searchbar onSubmit={this.searchInput} />
//         <ImageGallery onClick={this.modalOpen} gallery={gallery} />
        
//         {error && <h2 >{error}</h2>}
//         {loading && <Loader/>}

//         {(Boolean(gallery.length) && page < totalPage)&& <ButtonLoadMore loader={this.loaderMore} type="button" />}
//         {showModal && (
//           <Modal onClose={this.modalClose}>
//             <img src={url} alt={tags} />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App;