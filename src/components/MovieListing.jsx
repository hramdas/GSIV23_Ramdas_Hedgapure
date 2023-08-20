import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMovies } from '../api';
import Header from './Header';
import { Link } from 'react-router-dom';

const MovieListing = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    const {results} = await getMovies(page, searchText)
    if (results)
      page===1 ? setMovies(results) : setMovies([...movies, ...results])
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPage(1)
    setSearchText(value);
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      fetchMovies();
    }, 300)
    return () => clearTimeout(getData)
  }, [page, searchText]);

  return (
    <div>
      <Header handleInputChange={handleInputChange} page='list' />
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="movie-list">
          {movies.map((movie) => (
            <Link style={{all:'unset', cursor: 'pointer'}} key={movie.id} to={`/${movie.id}`}>
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
                <div className="movie-details">
                  <div className="movie-title-rating">
                    <b>{movie.title}</b>
                    <p>{movie.vote_average}</p>
                  </div>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieListing;
