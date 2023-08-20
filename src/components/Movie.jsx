import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getMovie, getMovieCast } from '../api'
import { useParams } from 'react-router-dom'

export default function Movie() {
  const [movie, setMovie] = useState()
  const [director, setDirector] = useState('')
  const [castList, setCastList] = useState('')
  const { id } = useParams()

  const getMovieDetails = async () => {
    const movieDetails = await getMovie(id)
    setMovie(movieDetails)
  }

  const getMovieCastDetails = async () => {
    const credits = await getMovieCast(id)
    const castArray = []
    if (credits?.cast.length) {
      credits?.cast.map(cast =>castArray.push(cast.name))
    }
    setCastList(castArray.join(', '))
    
    const directorData =credits.crew.find(
      (crewMember) => crewMember.job === 'Director'
    )
    setDirector(directorData?.name || '')

  }

  useEffect(() => {
    getMovieDetails()
    getMovieCastDetails()
  }, [])
  
  return (
    <div className="movie-details-page">
      <Header page='movie' />
      {movie ?
        <div className='movie-details-card'>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
          <div className='movie-details-card-content'>
            <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
              <h1>{movie.title} </h1>
              <h1 style={{color:'#d0d0d0'}}>({movie.vote_average})</h1>
            </div>
            <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
              <p>{movie.release_date?.split('-')[0] || '-'}</p> |
              <p>{movie.runtime || '-'}</p> |
              <p>{director || '-'}</p>
            </div>
            <div>Cast : {castList} </div>
            <div>Description : {movie.overview}</div>
          </div>
        </div>
        :
        <div>Loading... </div>}
    </div>
  )
}
