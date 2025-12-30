import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Navbar from './Navbar';
import Footer from './Footer';

const Details = ({ contentType: initialContentType = 'movie' }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const [contentType, setContentType] = useState(initialContentType);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const mediaType = contentType === 'tv' ? 'tv' : 'movie';

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
                    fetch(`https://api.themoviedb.org/3/${mediaType}/${id}`, API_OPTIONS),
                    fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos`, API_OPTIONS),
                    fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits`, API_OPTIONS)
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
            } catch {
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, mediaType]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', paddingTop: '2rem', background: 'var(--color-base)' }}>
                <Spinner />
            </div>
        );
    }

    if (!movie) {
        return (
            <div style={{ minHeight: '100vh', paddingTop: '2rem', background: 'var(--color-base)', padding: '2rem' }}>
                <p style={{ color: 'var(--color-text)', textAlign: 'center', fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
                    {mediaType === 'tv' ? 'TV Show' : 'Movie'} not found
                </p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-base)', position: 'relative' }}>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 30% 20%, rgba(0, 212, 255, 0.06) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(251, 191, 36, 0.04) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    contentType={contentType}
                    setContentType={setContentType}
                />
                <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3.5 lg:px-7 lg:py-4 text-sm sm:text-base"
                        style={{
                            marginBottom: '2rem',
                            cursor: 'pointer',
                            background: 'rgba(37, 40, 67, 0.6)',
                            backdropFilter: 'blur(10px)',
                            color: 'var(--color-text)',
                            border: '1px solid rgba(0, 212, 255, 0.2)',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontFamily: 'var(--font-display)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(-4px)';
                            e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                        }}
                    >
                        <span>←</span>
                        <span>Back to {mediaType === 'tv' ? 'TV Shows' : 'Movies'}</span>
                    </button>

            <div className="movie-details" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                {trailer && (
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{
                            marginBottom: '1.5rem',
                            color: 'var(--color-text)',
                            fontSize: '2rem',
                            fontWeight: '700',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.02em'
                        }}>
                            Official Trailer
                        </h2>
                        <div style={{
                            position: 'relative',
                            paddingBottom: '56.25%',
                            height: 0,
                            overflow: 'hidden',
                            borderRadius: '16px',
                            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 212, 255, 0.2)',
                            border: '1px solid rgba(0, 212, 255, 0.2)'
                        }}>
                            <iframe
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                    borderRadius: '16px'
                                }}
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title="Movie Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-10" style={{
                    marginBottom: '3rem',
                    alignItems: 'start',
                    background: 'rgba(37, 40, 67, 0.5)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <img
                        src={movie.poster_path ?
                            `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                            "no-movie.png"
                        }
                        alt={movie.title || movie.name}
                        className="w-full sm:w-[250px] lg:w-[300px] mx-auto sm:mx-0"
                        style={{
                            borderRadius: '12px',
                            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 212, 255, 0.2)',
                            border: '2px solid rgba(0, 212, 255, 0.2)',
                            transition: 'all 0.3s ease'
                        }}
                    />

                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-5xl" style={{
                            marginBottom: '1.5rem',
                            color: 'var(--color-text)',
                            fontWeight: '800',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.03em',
                            lineHeight: '1.1',
                            background: 'linear-gradient(135deg, var(--color-text) 0%, var(--color-cyan) 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {movie.title || movie.name}
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-8 text-sm sm:text-base lg:text-lg" style={{
                            marginBottom: '2rem',
                            flexWrap: 'wrap',
                            fontFamily: 'var(--font-body)',
                            fontWeight: '500'
                        }}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--color-amber)',
                                background: 'rgba(251, 191, 36, 0.1)',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(251, 191, 36, 0.2)'
                            }}>
                                ⭐ {movie.vote_average?.toFixed(1)}/10
                            </span>
                            <span style={{ color: 'var(--color-text-muted)' }}>
                                📅 {movie.release_date || movie.first_air_date}
                            </span>
                            {mediaType === 'movie' && movie.runtime && (
                                <span style={{ color: 'var(--color-text-muted)' }}>⏱️ {movie.runtime} min</span>
                            )}
                            {mediaType === 'tv' && movie.number_of_seasons && (
                                <span style={{ color: 'var(--color-text-muted)' }}>
                                    📺 {movie.number_of_seasons} Season{movie.number_of_seasons > 1 ? 's' : ''}
                                </span>
                            )}
                            {mediaType === 'tv' && movie.number_of_episodes && (
                                <span style={{ color: 'var(--color-text-muted)' }}>
                                    🎬 {movie.number_of_episodes} Episodes
                                </span>
                            )}
                        </div>

                        {movie.genres && movie.genres.length > 0 && (
                            <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.625rem 1.25rem',
                                            background: 'rgba(0, 212, 255, 0.1)',
                                            color: 'var(--color-cyan)',
                                            borderRadius: '10px',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            fontFamily: 'var(--font-display)',
                                            border: '1px solid rgba(0, 212, 255, 0.2)',
                                            letterSpacing: '0.01em',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h3 style={{
                            marginBottom: '1rem',
                            color: 'var(--color-text)',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.01em'
                        }}>
                            Synopsis
                        </h3>
                        <p style={{
                            lineHeight: '1.9',
                            marginBottom: '2rem',
                            color: 'var(--color-text-muted)',
                            fontSize: '1.05rem',
                            fontFamily: 'var(--font-body)'
                        }}>
                            {movie.overview || "No synopsis available."}
                        </p>

                        {movie.tagline && (
                            <p style={{
                                fontStyle: 'italic',
                                color: 'var(--color-cyan)',
                                marginBottom: '2rem',
                                fontSize: '1.15rem',
                                borderLeft: '3px solid var(--color-cyan)',
                                paddingLeft: '1.25rem',
                                fontWeight: '500',
                                background: 'rgba(0, 212, 255, 0.05)',
                                padding: '1rem 1.25rem',
                                borderRadius: '8px'
                            }}>
                                "{movie.tagline}"
                            </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" style={{
                            marginTop: '1.5rem'
                        }}>
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: '10px',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}>
                                <div style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</div>
                                <div style={{ color: 'var(--color-text)', fontSize: '1.05rem', fontWeight: '600' }}>{movie.status}</div>
                            </div>

                            {movie.budget > 0 && (
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    <div style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Budget</div>
                                    <div style={{ color: 'var(--color-amber)', fontSize: '1.05rem', fontWeight: '700' }}>${movie.budget.toLocaleString()}</div>
                                </div>
                            )}

                            {movie.revenue > 0 && (
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    <div style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue</div>
                                    <div style={{ color: 'var(--color-cyan)', fontSize: '1.05rem', fontWeight: '700' }}>${movie.revenue.toLocaleString()}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {cast.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <h2 style={{
                            marginBottom: '2rem',
                            color: 'var(--color-text)',
                            fontSize: '2rem',
                            fontWeight: '700',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.02em'
                        }}>
                            Featured Cast
                        </h2>
                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                            {cast.map((actor, index) => (
                                <div
                                    key={actor.id}
                                    style={{
                                        textAlign: 'center',
                                        background: 'rgba(37, 40, 67, 0.5)',
                                        backdropFilter: 'blur(10px)',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        animation: `fadeInScale 0.6s ease-out ${index * 0.05}s both`
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 212, 255, 0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
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
                                            borderRadius: '10px',
                                            marginBottom: '0.875rem',
                                            aspectRatio: '2/3',
                                            objectFit: 'cover',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                            border: '2px solid rgba(0, 212, 255, 0.1)'
                                        }}
                                    />
                                    <p style={{
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        color: 'var(--color-text)',
                                        marginBottom: '0.375rem',
                                        fontFamily: 'var(--font-display)',
                                        letterSpacing: '-0.01em'
                                    }}>
                                        {actor.name}
                                    </p>
                                    <p style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--color-text-dim)',
                                        lineHeight: '1.4',
                                        fontFamily: 'var(--font-body)'
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
            </div>
            <Footer />
        </div>
    );
};

export default Details;
