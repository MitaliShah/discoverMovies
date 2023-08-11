
export default function WatchedMovie({ movie  }) {
    return (
        <li className="movielist">
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
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
        </div>        
        </li>
    )
}