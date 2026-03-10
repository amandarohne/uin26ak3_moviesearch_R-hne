import { Link } from "react-router-dom"

export default function MovieCard({ movie }){
    return (
        <Link to={`/${movie.Title}`}>
        <article>
            
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>

        </article>
        </Link>
    )
}