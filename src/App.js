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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
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
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {    
    setWatched(watched => watched.filter(movie => movie.imdbId !== id))
  }

  useEffect(() => {
    document.addEventListener('keydown', function(e) {
      if(e.code === 'Escape') {
        handleCloseMovie();
      }
    })
  }, []);
  
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

    fetchMovies();

    return function() {
      controller.abort();
    }

  }, [query]);

  // console.log(movies)

  return (
    <div className="App">
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* display the searched movie list, if available */}
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} /> } */}
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
