import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import { getMovieCredits } from '../../api/api';
import { MdOutlineImageNotSupported } from 'react-icons/md';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const contentRef = useRef(null);

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
    if (isLoading) return;
    if (cast.length > 0 && contentRef.current) {
      const { height } = contentRef.current.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
  }, [cast, isLoading]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Movie Cast</h2>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!error && cast.length > 0 ? (
        <ul className={css.list}>
          {cast.map(({ id, name, character, profile_path }, index) => (
            <li
              key={id}
              className={css.listItem}
              ref={index === 0 ? contentRef : null}
            >
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                  alt={name}
                  width={300}
                />
              ) : (
                <p className={css.noImg}>
                  <MdOutlineImageNotSupported size="30px" />
                  No Image
                </p>
              )}

              <div className={css.wrapperText}>
                <p className={css.text}>{name}</p>
                {character && <p>{character}</p>}
              </div>
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
