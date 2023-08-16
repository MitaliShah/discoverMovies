const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }) {

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
        <h2>Movies you watched</h2>
        <div className="summary-list">
            <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
            </p>
            <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
            </p>
            <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
            </p>
        </div>
        </div>
    )
}