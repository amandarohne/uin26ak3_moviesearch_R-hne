import { useEffect, useState } from "react"
import History from "../components/History"
import MovieCard from "../components/MovieCard"

export default function Home(){
    const [search, setSearch] = useState("")
    const storedHistory = localStorage.getItem("search")
    const[focused, setFocused] = useState(false)

    const [movies, setMovies] = useState([])

    const [history, setHistory] = useState(storedHistory ?JSON.parse(storedHistory) : []) 

    console.log("Denne kommer fra storage", storedHistory)

    const baseUrl = `https://www.omdbapi.com/?s=${search}&apikey=`
    //gjør sånn!!
    const apiKey = import.meta.env.VITE_APP_API_KEY

 

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(history))
    },[history])

    useEffect(()=>{
        getBondMovies()
    }, [])

    const getBondMovies = async () => {
        try {
        const response = await fetch(`https://www.omdbapi.com/?s=james+bond&apikey=${apiKey}`)
        const data = await response.json()

        if  (data.Search) {
            setMovies(data.Search)
        }

        } catch (err){
            console.error(err)
        }
    }

    const getMovies = async()=>{
        try
        {
            if (!search || search.length < 3) return 

            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()

            if(data.Search){
                setMovies(data.Search)
            }
            console.log(data)
        }
        catch(err){
            console.error(err);
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])

        
    }
    console.log(history)

    return (
    <main>
        <h1>Forside</h1> 
        <form onSubmit={handleSubmit}>
            <label>
                Søk etter film:
            <input type="search" placeholder="Harry Potter" onChange={handleChange} onFocus={()=> setFocused(true)} /*onBlur={()=> setFocused(false)}*/></input>
            </label>
            {
        focused ? <History history={history} setSearch={setSearch}/> : null }
            <button onClick={getMovies}>Søk</button>
        </form>

        <section>
            {movies.map(movie => ( 
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </section>
    
        
    </main>
        
    )
   
}