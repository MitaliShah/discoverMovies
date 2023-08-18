import { useEffect, useState } from "react"
import { useKey } from "./useKey";

export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
    const [movie, setMovie] = useState({});
    const {
        Title: title, 
        Year: year, 
        Poster: poster, 
        Runtime: runtime, 
        imdbRating,
        Plot: plot, 
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
      } = movie;

    const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
    function handleAdd() {
        const newWatchedMovie = {
            imdbId: selectedId,
            title,
            year,
            poster,            
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0))
        }
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useKey('Escape', onCloseMovie)
    
    useEffect(() => {
        if(!title) return;
        document.title = `Movie | ${title}`

        return function() {
            document.title = "Movie App";
        }
    }, [title]);

    useEffect(() => {
        async function getMovieDetails() {
            // Fetching movie details with selectedId
            const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`)
            const data = await res.json();
            setMovie(data)
        }
        getMovieDetails()
    },[selectedId])

    
    return (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                <img src={poster} alt={`Poster of ${movie}`} className="movie-detail-poster"/>
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>{released} &bull; {runtime}</p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐</span>
                        {imdbRating} IMDB rating
                    </p>
                </div>
            </header>
            {!isWatched ? 
                <button className="btn-add" onClick={handleAdd}>+ Add to list</button> : 
                <p className="watchlist-message">This movie is already on a watch list</p>}
            <section className="movie-plot">
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    )
}