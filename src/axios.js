import axios from 'axios';
const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY

export const AXIOS = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/upcoming/?api_key=${API_KEY}`
});