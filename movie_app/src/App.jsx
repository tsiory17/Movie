import React, {useState, useEffect} from 'react';
import {useDebounce} from "react-use";
import Search from './components/Search.jsx'
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import Header from "./components/Header.jsx";
import Pagination from "./components/Pagination.jsx";
import {updateSearch} from "./lib/appwrite.js";

const App = () => {
    const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
    const API_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${API_KEY}`
        }
    }

    const [search, setSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debounced,setDebounced] = useState('');

    const [pagination, setPagination] = useState(1);

    useDebounce(() => {setDebounced(search);}, 1700,[search]);

    const fetchMovies = async (query= '') => {
        setLoading(true);
        setErrorMessage('');

        try {
            const endpoint = query ?
                `${API_SEARCH_URL}?query=${encodeURIComponent(query)}` : `${API_BASE_URL}?sort_by=popularity.desc&page=${pagination}`;

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Could not fetch movies');
            }

            const data = await response.json();
            console.log(data);
            if (data.Response === 'false') {
                setErrorMessage(data.Error || "Could not fetch movies");
                setMovies([]);
                return;
            }
            setMovies(data.results || []);

            if(query && data.results.length > 0) {
                await updateSearch(query,data.results[0])
            }
        } catch (e) {
            setErrorMessage('Error fetching movies');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
       fetchMovies(debounced);
    }, [debounced,pagination]);





    return (
        <main>
            <div className="pattern"/>
            <div className="wrapper">
                {/*<header>*/}
                {/*    <img src={"hero.png"} alt={"hero"}></img>*/}
                {/*    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy</h1>*/}
                {/*    <Search search={search} setSearch={setSearch}/>*/}
                {/*</header>*/}
                <Header setSearch={setSearch} search={search} />
                <section className="all-movies">
                    {loading ? (
                        <Spinner/>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul className="mt-20">
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )
                    }
                    <Pagination pagination={pagination} setPagination={setPagination} />
                </section>
            </div>
        </main>
    )
}
export default App
