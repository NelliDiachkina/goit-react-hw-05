import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import { getMovieReviews } from '../../api/api';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const reviewsRef = useRef(null);

  useEffect(() => {
    if (!movieId) return;

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  useEffect(() => {
    if (reviews.length > 0 && reviewsRef.current) {
      const { height } = reviewsRef.current.getBoundingClientRect();
      window.scrollBy({ top: height, behavior: 'smooth' });
    }
  }, [reviews]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Movie Reviews</h2>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!error && reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map(({ id, author, content }, index) => (
            <li
              key={id}
              className={css.rewiew}
              ref={index === 0 ? reviewsRef : null}
            >
              <p className={css.text}>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.textMessage}>
          We don`t have any reviews for this movie yet ... 🙁
        </p>
      )}
    </div>
  );
}
