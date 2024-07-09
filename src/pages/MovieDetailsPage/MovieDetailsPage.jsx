import {
  NavLink,
  Outlet,
  useLocation,
  useParams,
  Link,
} from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { getMovieDetail } from '../../api/api';
import { defaultImg } from '../../api/helpers';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    if (!movieId) return;

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieDetail(movieId);
        setMovieDetail(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  const {
    release_date,
    original_title,
    poster_path,
    overview,
    genres,
    vote_average,
    backdrop_path,
  } = movieDetail || {};

  const year = release_date?.split('-')[0] || 'Unknown';
  const score = Math.round(vote_average * 10);

  return (
    <main className={css.main}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <Link to={backLinkRef.current} className={css.link}>
        <FaArrowLeftLong />
        Go back
      </Link>
      {!error && movieDetail && (
        <div className={css.container}>
          <div className={css.wrapperImg}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : defaultImg
              }
              alt={original_title}
            />
          </div>
          <div className={css.content}>
            <h2>{original_title}</h2>
            <div className={css.wrapperText}>
              <p className={css.text}>User Score: {score}%</p>
              <p className={css.text}>Release Date: {year}</p>
            </div>
            <div className={css.wrapperText}>
              <h3>Overview</h3>
              <p>{overview}</p>
            </div>

            {genres.length > 0 && (
              <div className={css.wrapperText}>
                <h3>Genres</h3>
                <ul className={css.list}>
                  {genres.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={css.wrapperImg}>
            <img
              src={
                backdrop_path
                  ? `https://image.tmdb.org/t/p/w300${backdrop_path}`
                  : defaultImg
              }
              alt={original_title}
            />
          </div>
          <ul className={css.navList}>
            <li>
              <NavLink to="cast" className={css.link}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={css.link}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
}
