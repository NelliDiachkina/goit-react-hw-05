import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import { getMovieCredits } from '../../api/api';
import { defaultImg } from '../../api/helpers';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    if (!movieId) return;

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  useEffect(() => {
    if (cast.length > 0 && contentRef.current) {
      window.scrollTo({
        top: window.scrollY + 500,
        behavior: 'smooth',
      });
    }
  }, [cast]);

  return (
    <div className={css.container}>
      <h2>MovieCast</h2>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!error && cast.length > 0 ? (
        <ul className={css.list} ref={contentRef}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={css.listItem}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300${profile_path}`
                    : defaultImg
                }
                alt={name}
                width="250"
              />
              <p className={css.text}>{name}</p>
              {character && <p>{character}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.textMessage}>
          Sorry! We have no information about the cast of this film 🙁
        </p>
      )}
    </div>
  );
}
