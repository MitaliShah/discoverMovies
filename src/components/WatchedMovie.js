
export default function WatchedMovie({ movie, onDeleteWatched  }) {
    console.log(movie)
    return (
        <li className="movielist">
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="movie-detail">
        <h3>{movie.Title}</h3>
        <div>
            <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
            </p>
            <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
            </p>
            <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
            </p>
        </div>
        <button className="btn-delete" 
        onClick={() => onDeleteWatched(movie.imdbId)}
        >X</button>
        </div>     
        </li>
    )
}