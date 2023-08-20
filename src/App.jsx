import { useState } from 'react'
import './App.css'
import MovieListing from './components/MovieListing'
import { Route, Routes } from 'react-router-dom'
import Movie from './components/Movie'

function App() {

  return (
    <Routes>
      <Route path='/' element={ <MovieListing />} />
      <Route path='/:id' element={ <Movie />} />
    </Routes>
  )
}

export default App
