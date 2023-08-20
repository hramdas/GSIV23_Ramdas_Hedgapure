import { AXIOS } from "./axios";
const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY

export const getMovies = async (page, query) => {
  try {
    let options = {
      url: `/discover/movie`,
      method: 'GET',
      params: {
        api_key: API_KEY,
        page,
        sort_by: 'primary_release_date.asc',
        'primary_release_date.gte': (new Date()).toISOString().split('T')[0],
      }
    }

    if (query) {
      options = {
        url: `/search/movie`,
        method: 'GET',
        params: {
          api_key: API_KEY,
          page,
          query
        }
      }
    }

    const { data } = await AXIOS(options)
    return data
  } catch (error) {
    console.error(error.message);
  }
}

export const getMovie = async (movieId) => {
  try {
    let options = {
      url: `/movie/${movieId}`,
      method: 'GET',
      params: {
        api_key: API_KEY
      }
    }

    const { data } = await AXIOS(options)
    return data
  } catch (error) {
    console.error(error.message);
  }
}

export const getMovieCast = async (movieId) => {
  try {
    let options = {
      url: `/movie/${movieId}/credits`,
      method: 'GET',
      params: {
        api_key: API_KEY
      }
    }

    const { data } = await AXIOS(options)
    return data
  } catch (error) {
    console.error(error.message);
  }
}

