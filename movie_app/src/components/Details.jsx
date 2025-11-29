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
                ) || videosData.results?.find(
                    video => video.site === "YouTube"
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
            <div style={{ minHeight: '100vh', paddingTop: '2rem', background: '#f5f5f5' }}>
                <Spinner />
            </div>
        );
    }

    if (!movie) {
        return (
            <div style={{ minHeight: '100vh', paddingTop: '2rem', background: '#f5f5f5', padding: '2rem' }}>
                <p style={{ color: '#333' }}>Movie not found</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '2rem', background: '#f5f5f5', padding: '2rem' }}>
            <button
                onClick={() => navigate('/')}
                style={{
                    marginBottom: '2rem',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    background: '#fff',
                    color: '#333',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.borderColor = '#999'}
                onMouseOut={(e) => e.target.style.borderColor = '#ddd'}
            >
                ← Back to Movies
            </button>

            <div className="movie-details">
                {trailer && (
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ marginBottom: '1rem', color: '#1a1a1a', fontSize: '1.75rem', fontWeight: '600' }}>Trailer</h2>
                        <div style={{
                            position: 'relative',
                            paddingBottom: '56.25%',
                            height: 0,
                            overflow: 'hidden',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            <iframe
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                    borderRadius: '12px'
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
                    gap: '2.5rem',
                    marginBottom: '3rem',
                    alignItems: 'start',
                    background: '#fff',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    <img
                        src={movie.poster_path ?
                            `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                            "no-movie.png"
                        }
                        alt={movie.title}
                        style={{
                            width: '300px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    />

                    <div>
                        <h1 style={{ marginBottom: '1rem', color: '#1a1a1a', fontSize: '2.5rem', fontWeight: '700' }}>
                            {movie.title}
                        </h1>

                        <div style={{
                            marginBottom: '1.5rem',
                            display: 'flex',
                            gap: '1.5rem',
                            flexWrap: 'wrap',
                            fontSize: '1rem',
                            color: '#555'
                        }}>
                            <span style={{ fontWeight: '500' }}>⭐ {movie.vote_average?.toFixed(1)}/10</span>
                            <span>📅 {movie.release_date}</span>
                            <span>⏱️ {movie.runtime} min</span>
                        </div>

                        {movie.genres && movie.genres.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.5rem 1rem',
                                            margin: '0.25rem',
                                            background: '#e8f4f8',
                                            color: '#0066cc',
                                            borderRadius: '20px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h3 style={{ marginBottom: '0.75rem', color: '#1a1a1a', fontSize: '1.25rem', fontWeight: '600' }}>
                            Synopsis
                        </h3>
                        <p style={{ lineHeight: '1.8', marginBottom: '1.5rem', color: '#333', fontSize: '1rem' }}>
                            {movie.overview || "No synopsis available."}
                        </p>

                        {movie.tagline && (
                            <p style={{
                                fontStyle: 'italic',
                                color: '#666',
                                marginBottom: '1.5rem',
                                fontSize: '1.1rem',
                                borderLeft: '3px solid #0066cc',
                                paddingLeft: '1rem'
                            }}>
                                "{movie.tagline}"
                            </p>
                        )}

                        <div style={{ marginBottom: '0.75rem', color: '#333', fontSize: '1rem' }}>
                            <strong style={{ color: '#1a1a1a' }}>Status:</strong> {movie.status}
                        </div>

                        {movie.budget > 0 && (
                            <div style={{ marginBottom: '0.75rem', color: '#333', fontSize: '1rem' }}>
                                <strong style={{ color: '#1a1a1a' }}>Budget:</strong> ${movie.budget.toLocaleString()}
                            </div>
                        )}

                        {movie.revenue > 0 && (
                            <div style={{ marginBottom: '0.75rem', color: '#333', fontSize: '1rem' }}>
                                <strong style={{ color: '#1a1a1a' }}>Revenue:</strong> ${movie.revenue.toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>

                {cast.length > 0 && (
                    <div>
                        <h2 style={{ marginBottom: '1.5rem', color: '#1a1a1a', fontSize: '1.75rem', fontWeight: '600' }}>
                            Cast
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {cast.map(actor => (
                                <div
                                    key={actor.id}
                                    style={{
                                        textAlign: 'center',
                                        background: '#fff',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        transition: 'transform 0.2s, box-shadow 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
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
                                            marginBottom: '0.75rem',
                                            aspectRatio: '2/3',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <p style={{
                                        fontWeight: '600',
                                        fontSize: '0.875rem',
                                        color: '#1a1a1a',
                                        marginBottom: '0.25rem'
                                    }}>
                                        {actor.name}
                                    </p>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: '#666',
                                        lineHeight: '1.4'
                                    }}>
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
