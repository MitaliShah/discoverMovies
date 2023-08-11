
export default function Movie({ movie }) {
    return (
      <li className="movielist">
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