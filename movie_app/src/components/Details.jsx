import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const API_OPTIONS = {
        method: "GET",
        headers: {
            accept: "application/json",
            authorization: `Bearer ${API_KEY}`,
        },
    };

    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            try {
                const [movieRes, videosRes, creditsRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}`, API_OPTIONS),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, API_OPTIONS),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, API_OPTIONS)
                ]);

                const movieData = await movieRes.json();
                const videosData = await videosRes.json();
                const creditsData = await creditsRes.json();

                setMovie(movieData);

                const youtubeTrailer = videosData.results?.find(
                    video => video.type === "Trailer" && video.site === "YouTube"
                );
                setTrailer(youtubeTrailer);

                setCast(creditsData.cast?.slice(0, 10) || []);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="wrapper bg-dark-100" style={{ minHeight: '100vh', paddingTop: '2rem' }}>
                <Spinner />
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="wrapper bg-dark-100" style={{ minHeight: '100vh', paddingTop: '2rem' }}>
                <p>Movie not found</p>
            </div>
        );
    }

    return (
        <div className="wrapper bg-dark-100" style={{ minHeight: '100vh', paddingTop: '2rem' }}>
            <button
                onClick={() => navigate('/')}
                style={{
                    marginBottom: '2rem',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    background: '#1a1a1a',
                    color: 'white',
                    border: '1px solid #333',
                    borderRadius: '4px'
                }}
            >
                ← Back to Movies
            </button>

            <div className="movie-details">
                {trailer && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Trailer</h2>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                            <iframe
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0
                                }}
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title="Movie Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '2rem',
                    marginBottom: '2rem',
                    alignItems: 'start'
                }}>
                    <img
                        src={movie.poster_path ?
                            `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                            "no-movie.png"
                        }
                        alt={movie.title}
                        style={{ width: '300px', borderRadius: '8px' }}
                    />

                    <div>
                        <h1 style={{ marginBottom: '1rem' }}>{movie.title}</h1>

                        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <span>⭐ {movie.vote_average?.toFixed(1)}/10</span>
                            <span>📅 {movie.release_date}</span>
                            <span>⏱️ {movie.runtime} min</span>
                        </div>

                        {movie.genres && movie.genres.length > 0 && (
                            <div style={{ marginBottom: '1rem' }}>
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.25rem 0.75rem',
                                            margin: '0.25rem',
                                            background: '#333',
                                            borderRadius: '4px',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h3 style={{ marginBottom: '0.5rem' }}>Synopsis</h3>
                        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                            {movie.overview || "No synopsis available."}
                        </p>

                        {movie.tagline && (
                            <p style={{ fontStyle: 'italic', color: '#999', marginBottom: '1rem' }}>
                                "{movie.tagline}"
                            </p>
                        )}

                        <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Status:</strong> {movie.status}
                        </div>

                        {movie.budget > 0 && (
                            <div style={{ marginBottom: '0.5rem' }}>
                                <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                            </div>
                        )}

                        {movie.revenue > 0 && (
                            <div style={{ marginBottom: '0.5rem' }}>
                                <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>

                {cast.length > 0 && (
                    <div>
                        <h2 style={{ marginBottom: '1rem' }}>Cast</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gap: '1rem'
                        }}>
                            {cast.map(actor => (
                                <div
                                    key={actor.id}
                                    style={{
                                        textAlign: 'center',
                                        background: '#1a1a1a',
                                        padding: '1rem',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <img
                                        src={actor.profile_path ?
                                            `https://image.tmdb.org/t/p/w185${actor.profile_path}` :
                                            "no-movie.png"
                                        }
                                        alt={actor.name}
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                            marginBottom: '0.5rem'
                                        }}
                                    />
                                    <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                                        {actor.name}
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: '#999' }}>
                                        {actor.character}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;
