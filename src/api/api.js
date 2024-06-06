import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmZlNjQxZjBkMzk2N2EwNjc1ZGI5NWFhZjQ1N2YyMSIsInN1YiI6IjY2NWM1MWY2N2YwNTg1MTRhNzEwODA4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yOtoctldLtFPFHDQMMJ4v1FWeNcMQDkqjYbrRv5m9YE',
  },
};

export async function getTrendingMovies() {
  const response = await axios.get('trending/movie/week', options);
  return response.data;
}

export async function getMovieDetail(movieId) {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data;
}

export async function getSearchMovie(query) {
  const response = await axios.get(`search/movie?query=${query}`, options);
  return response.data;
}
