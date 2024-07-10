import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { MdOutlineImageNotSupported } from 'react-icons/md';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(
        ({ id, title, poster_path, original_title, vote_average }) => (
          <li key={id} className={css.listItem}>
            <Link to={`/movies/${id}`} className={css.link} state={location}>
              <div className={css.wrapper}>
                {poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                    alt={original_title}
                    width={300}
                  />
                ) : (
                  <p className={css.noImg}>
                    <MdOutlineImageNotSupported size="30px" />
                    No Image
                  </p>
                )}
              </div>
              <p className={css.text}>{title}</p>
              {vote_average > 0 && (
                <p className={css.vote}>
                  {vote_average.toFixed(1)}
                  <span>★</span>
                </p>
              )}
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
