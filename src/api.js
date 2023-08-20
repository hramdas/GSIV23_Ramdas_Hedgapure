import { AXIOS } from "./axios";
const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY

export const getMovies = async (page) => {
  try {
    const options = {
      url: `/?api_key=${API_KEY}`,
      method: 'GET',
      params: {
        page
      }
    }
    const { data } = await AXIOS(options)
    return data || []
  } catch (error) {
    console.error(error.message);
  }
}