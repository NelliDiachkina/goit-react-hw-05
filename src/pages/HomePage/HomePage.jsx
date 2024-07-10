import { useEffect, useState } from 'react';

import { getTrendingMovies } from '../../api/api';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './HomePage.module.css';
import TypewriterEffect from '../../components/TypewriterEffect/TypewriterEffect';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const text =
    'Find your next favorite movie ... All the films you want to see in one place!';

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
    <main className={css.main}>
      <div className={css.wrapperTitile}>
        <h1>Trending movies this week</h1>
        <TypewriterEffect text={text} />
      </div>

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!error && movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
