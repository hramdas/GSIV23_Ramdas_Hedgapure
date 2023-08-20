import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMovies } from '../api';
import Header from './Header';

const MovieListing = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    const {results} = await getMovies(page)
    if (results)
      setMovies([...movies, ...results])
  };

  return (
    <div>
      <Header />
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
              <div className="movie-title-rating">
                <b>{movie.title}</b>
                <p>{movie.vote_average}</p>
              </div>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieListing;
