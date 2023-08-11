import Movie from "./Movie";

export default function MovieList({ movies }) {
    if(movies){
        return (
            <ul className="list">
              {movies.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
              ))}
            </ul>
        );
    }    
}