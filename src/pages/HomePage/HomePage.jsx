import { useEffect, useState } from 'react';

import { getTrendingMovies } from '../../api/api';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
