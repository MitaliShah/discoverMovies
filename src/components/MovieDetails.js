import { useEffect, useState } from "react"

export default function MovieDetails({ selectedId, onCloseMovie }) {
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

      console.log(title,year);

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
                <img src={poster} alt={`Poster of ${movie}`} />
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
            <section>
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    )
}