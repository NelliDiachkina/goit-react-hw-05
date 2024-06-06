import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchMovie } from '../../api/api';

import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovies = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!searchMovies) return;

    async function getData() {
      try {
        setFoundMovies([]);
        setIsLoading(true);
        setError(false);
        const data = await getSearchMovie(searchMovies);
        setFoundMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [searchMovies]);

  const handleSearch = newQuery => {
    setSearchParams({ query: newQuery });
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!error && foundMovies.length > 0 && <MovieList movies={foundMovies} />}
      {!error && !isLoading && searchMovies && foundMovies.length === 0 && (
        <p className={css.message}>No movies found for this query ... 🙁 </p>
      )}
    </div>
  );
}
