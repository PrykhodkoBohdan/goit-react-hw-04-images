import { useState } from 'react';
import style from '../../style/styles.module.css';
import {ImSearch} from 'react-icons/im';

const Searchbar = ({onSubmit}) =>{

  const [searchImg, setSearchImg] = useState('')

  const  hendleSubmit = e => {
        e.preventDefault();
        if (searchImg.trim() === '') {
          return alert('write search inquiry');
        }
       onSubmit(searchImg);
      setSearchImg('');
      };

    const  handleName = e => {
      setSearchImg(e.target.value)

          };

  return (
          <header className={style.Searchbar}>
            <form onSubmit={hendleSubmit} className={style.SearchForm}>
              <button type="submit" className={style.SearchFormButton}>
              <span className={style.SearchFormLabel}>
            <ImSearch/>
            </span>
              </button>
              <input
                className={style.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={searchImg}
                name='input'
                onChange={handleName}
                required
              />
            </form>
          </header>
        );
}

export default Searchbar;
// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// }

// class Searchbar extends Component {
//   state = {
//     searchImg: '',
//   }


//   hendleSubmit = e => {
//     e.preventDefault();
//     if (this.state.searchImg.trim() === '') {
//       return alert('write search inquiry');
//     }
//     this.props.onSubmit(this.state.searchImg);
//   this.setState({searchImg: ''})
//   };

//   handleName = ({ target }) => {
//     const { value } = target;
//     this.setState({ searchImg: value })
//   };

//   render() {
//     const { searchImg } = this.state;

//     return (
//       <header className={style.Searchbar}>
//         <form onSubmit={this.hendleSubmit} className={style.SearchForm}>
//           <button type="submit" className={style.SearchFormButton}>
//           <span className={style.SearchFormLabel}>
//         <ImSearch/>
//         </span>
//           </button>
//           <input
//             className={style.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={searchImg}
//             name='input'
//             onChange={this.handleName}
//             required
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
