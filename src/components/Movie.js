
export default function Movie({ movie, onSelectMovie }) {
    return (
      <li className="movielist" onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <div className="movie-detail">
            <h3>{movie.Title}</h3>
            <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
            </div>
        </div>        
      </li>
    );
  }