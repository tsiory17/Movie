import React, {useState, useEffect} from 'react'
import Search from './components/Search.jsx'

const App = () => {
    const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${API_KEY}`
        }
    }

    const [search, setSearch] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchMovies = async () => {
        try {
            const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);

            if(!response.ok) {
                throw new Error('Could not fetch movies');
            }

            const data = await response.json();
        } catch (e) {
            setErrorMessage('Error fetching movies');
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);
    return (
        <main>
            <div className="pattern"/>
            <div className="wrapper">
                <header>
                    <img src={"hero.png"} alt={"hero"}></img>
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy</h1>
                    <Search search={search} setSearch={setSearch}/>
                </header>
                <section className="all-movies">
                    <h2 className="text-white">All Movies</h2>
                    {errorMessage && <h2 className="text-red-500">{errorMessage}</h2>}
                </section>
            </div>
        </main>
    )
}
export default App
