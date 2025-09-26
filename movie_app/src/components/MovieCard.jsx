import React from 'react'

const MovieCard = ({movie:
    {poster_path,title,release_date,id,vote_average,original_language}}) => {
    return (
        <div className="movie-card">

            <img src={poster_path ?
                `https://image.tmdb.org/t/p/w500/${poster_path}`: "no-movie.png"} alt={title}>
            </img>

            <div className="mt-10">
                <h3>{title}</h3>
            </div>

            <div className="content">
                <div className="rating">
                    <img src="./star.svg"></img>
                    <p>{vote_average? vote_average.toFixed(1): "No ratings"}</p>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <span>•</span>
                    <p className="year">{release_date ? release_date.split('-')[0] : "N/A"}</p>
                </div>

            </div>
        </div>
    )
}
export default MovieCard
