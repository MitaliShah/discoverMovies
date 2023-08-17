import './App.css';
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Main from './components/Main';
import Box from "./components/Box";
import NumResults from './components/NumResults';
import MovieList from './components/MovieList';
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from './components/WatchedSummary';
import MovieDetails from "./components/MovieDetails";
import Loader from './components/Loader';
import ErrorMessage from "./components/ErrorMessage";
import { useMovies } from './components/useMovies';
import { useLocalStorage } from './components/useLocalStorage';


function App() {
  const [query, setQuery] = useState("");  
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [selectedId, setSelectedId] = useState(null);
  const {movies, isLoading, error}= useMovies(query);  

  function handleMovieSelect(id) {
    // Clicking on the same movie again will set the selectedId to null
    setSelectedId(selectedId => id === selectedId ? null : id);
    // setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);    
  }

  function handleDeleteWatched(id) {    
    setWatched(watched => watched.filter(movie => movie.imdbId !== id))
  }

  return (
    <div className="App">
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleMovieSelect} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? 
            <MovieDetails 
              selectedId={selectedId} 
              onCloseMovie={handleCloseMovie} 
              onAddWatched={handleAddWatched} 
              watched={watched}
            /> : 
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList 
              watched={watched} 
              onDeleteWatched={handleDeleteWatched} 
            />
          </>
          }      
          
        </Box>
      </Main>  
    </div>
  );
}

export default App;
