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

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched])

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`, {signal: controller.signal});

        if(!res.ok) throw new Error("Something went wrong with fetching movies")

        const data = await res.json();   

        if(data.Response === 'False') {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        console.log(data.Search);
        setError("");       
      } catch(error) {
        if(error.name !== "AbortError") {
          console.log(error.message)
          setError(error.message);
        }        
      } finally { 
        setIsLoading(false);
      }      
    }

    if(query.length < 3) {
      setMovies([]);
      setError("");
      return
    }
    
    handleCloseMovie();
    fetchMovies();

    return function() {
      controller.abort();
    }

  }, [query]);

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
