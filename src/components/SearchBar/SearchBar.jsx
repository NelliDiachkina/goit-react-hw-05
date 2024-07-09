import toast, { Toaster } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';

import css from './SearchBar.module.css';

const notify = () => toast('Please enter a search query!');
const toastOptions = {
  duration: 2500,
  style: {
    background: '#e8e825',
    color: 'black',
  },
};

export default function SearchBar({ onSearch }) {
  const handleSubmit = e => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();
    newQuery === '' ? notify() : onSearch(newQuery);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search movie ..."
        className={css.input}
      />
      <button type="submit" className={css.btn}>
        <FaSearch size="30" />
      </button>
      <Toaster toastOptions={toastOptions} position="top-center" />
    </form>
  );
}
