
export default function NumResults({ movies }) {
    return (
        <p className="num-results">
            <span>Found <strong>{movies?.length}</strong> results</span>
        </p>
    )
}