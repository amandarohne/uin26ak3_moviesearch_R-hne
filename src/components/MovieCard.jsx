
export default function MovieCard({ movie }){
    return (
        <article>
            
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>

        </article>
    )
}