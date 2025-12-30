import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie, contentType = 'movie' }) => {
    const navigate = useNavigate();

    const displayTitle = movie.title || movie.name;
    const releaseYear = movie.release_date || movie.first_air_date;
    const mediaType = contentType === 'tv' ? 'tv' : 'movie';

    const handleClick = () => {
        navigate(`/${mediaType}/${movie.id}`);
    };

    return (
        <div className="movie-card" onClick={handleClick} style={{cursor: 'pointer'}}>

            <img src={movie.poster_path ?
                `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: "no-movie.png"} alt={displayTitle}>
            </img>

            <div className="mt-10">
                <h3>{displayTitle}</h3>
            </div>

            <div className="content">
                <div className="rating">
                    <img src="./star.svg"></img>
                    <p>{movie.vote_average? movie.vote_average.toFixed(1): "No ratings"}</p>
                    <span>•</span>
                    <p className="lang">{movie.original_language}</p>
                    <span>•</span>
                    <p className="year">{releaseYear ? releaseYear.split('-')[0] : "N/A"}</p>
                </div>

            </div>
        </div>
    )
}
export default MovieCard
