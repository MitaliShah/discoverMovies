import Movie from "./Movie";

export default function MovieList({ movies, onSelectMovie }) {
    if(movies){
        return (
            <ul className="list">
              {movies.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
              ))}
            </ul>
        );
    }    
}