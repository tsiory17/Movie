import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useDebounce } from "react-use";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import Header from "./components/Header.jsx";
import Pagination from "./components/Pagination.jsx";
import Details from "./components/Details.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { getMoviesTrending, updateSearch } from "./lib/appwrite.js";

const Home = () => {
  const navigate = useNavigate();
  const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
  const API_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = import.meta.env.VITE_TMDB_KEY;
  const isFirstRender = useRef(true);
  const topRef = useRef(null);

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${API_KEY}`,
    },
  };

  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounced, setDebounced] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [contentType, setContentType] = useState("movie");

  const [pagination, setPagination] = useState(1);

  useDebounce(
    () => {
      setDebounced(search);
    },
    1700,
    [search]
  );

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage("");
    try {
      const discoverUrl = `https://api.themoviedb.org/3/discover/${contentType}`;
      const searchUrl = `https://api.themoviedb.org/3/search/${contentType}`;

      let endpoint;
      if (query) {
        endpoint = `${searchUrl}?query=${encodeURIComponent(query)}`;
      } else if (selectedGenre) {
        endpoint = `${discoverUrl}?sort_by=popularity.desc&page=${pagination}&with_genres=${selectedGenre}`;
      } else {
        endpoint = `${discoverUrl}?sort_by=popularity.desc&page=${pagination}`;
      }

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Could not fetch movies");
      }

      const data = await response.json();
      if (data.Response === "false") {
        setErrorMessage(data.Error || "Could not fetch movies");
        setMovies([]);
        return;
      }
      setMovies(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearch(query, data.results[0]);
      }
    } catch {
      setErrorMessage("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  const loadMostSearched = async () => {
    try {
      const mostSearchedList = await getMoviesTrending();
      setSearchedMovies(mostSearchedList);
    } catch {
    }
  };
  useEffect(() => {
    fetchMovies(debounced);
  }, [debounced, pagination, selectedGenre, contentType]);

  useEffect(() => {
    setPagination(1);
    setSearch("");
  }, [selectedGenre]);

  useEffect(() => {
    setPagination(1);
    setSearch("");
    setSelectedGenre(null);
  }, [contentType]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    loadMostSearched();
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const allMoviesSection = document.getElementById("all-movies");
    if (allMoviesSection) {
      allMoviesSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [pagination, selectedGenre, contentType]);

  return (
    <main>
      <div className="pattern " />
      <Navbar
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        contentType={contentType}
        setContentType={setContentType}
      />
      <div className="wrapper">
        <div className="header" ref={topRef}>
          <Header setSearch={setSearch} search={search} />
        </div>

        {searchedMovies.length > 0 && (
          <section className="trending">
            <h2>Most Searched Movies</h2>
            <ul>
              {searchedMovies.map((movie, index) => (
                <li
                  key={movie.$id}
                  onClick={() => navigate(`/movie/${movie.movie_id}`)}
                  style={{cursor: 'pointer'}}
                >
                  <p>{index + 1}</p>
                  <img src={movie.poster_url}></img>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section id="all-movies" className="all-movies">
          <h1>{contentType === 'movie' ? 'All Movies' : 'All TV Shows'}</h1>

          <Pagination pagination={pagination} setPagination={setPagination} />

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="mt-20">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} contentType={contentType} />
              ))}
            </ul>
          )}
          <Pagination pagination={pagination} setPagination={setPagination} />
        </section>
      </div>
      <Footer />
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details contentType="movie" />} />
        <Route path="/tv/:id" element={<Details contentType="tv" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
