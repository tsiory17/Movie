import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV, MOVIE_GENRES, TV_GENRES } from '../constants/constants';

const Navbar = ({ selectedGenre, setSelectedGenre, contentType, setContentType }) => {
    const navigate = useNavigate();
    const [showGenreDropdown, setShowGenreDropdown] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState(null);
    const dropdownRef = useRef(null);

    const GENRES = contentType === 'tv' ? TV_GENRES : MOVIE_GENRES;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowGenreDropdown(false);
            }
        };

        if (showGenreDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showGenreDropdown]);

    const scrollToTop = () => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);
    };

    const scrollToAllMovies = () => {
        setTimeout(() => {
            const allMoviesSection = document.getElementById('all-movies');
            if (allMoviesSection) {
                allMoviesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const handleNavClick = (item) => {
        if (item === 'home') {
            setContentType('movie');
            setSelectedGenre(null);
            setActiveNavItem('home');
            navigate('/');
            scrollToTop();
        } else if (item === 'genre') {
            setShowGenreDropdown(!showGenreDropdown);
        } else if (item === 'movies') {
            setContentType('movie');
            setActiveNavItem('movies');
            navigate('/');
            scrollToAllMovies();
        } else if (item === 'tvShow') {
            setContentType('tv');
            setActiveNavItem('tvShow');
            navigate('/');
        }
    };

    const handleHomeClick = () => {
        setContentType('movie');
        setSelectedGenre(null);
        setActiveNavItem(null);
        navigate('/');
        scrollToTop();
    };

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        setShowGenreDropdown(false);
        navigate('/');
    };

    return (
        <nav className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5" style={{
            background: 'rgba(26, 29, 53, 0.8)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            animation: 'fadeInUp 0.6s ease-out'
        }}>
            <div className="gap-4 sm:gap-6 lg:gap-10" style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                <div
                    onClick={handleHomeClick}
                    className="text-xl sm:text-2xl lg:text-3xl"
                    style={{
                        cursor: 'pointer',
                        fontWeight: '800',
                        fontFamily: 'var(--font-display)',
                        background: 'linear-gradient(135deg, var(--color-cyan) 0%, var(--color-amber) 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.filter = 'drop-shadow(0 0 12px rgba(0, 212, 255, 0.5))';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'none';
                    }}
                >
                    <span className="text-2xl sm:text-3xl lg:text-4xl">🎬</span>
                    <span>Movie App</span>
                </div>

                <div className="flex-1 overflow-x-auto hide-scrollbar" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {NAV.map((item) => {
                        const isGenreButton = item === 'genre';
                        const isGenreActive = isGenreButton && selectedGenre !== null;
                        const isNavItemActive = activeNavItem === item;
                        const isActive = isGenreActive || isNavItemActive;

                        const buttonText = isGenreButton && selectedGenre
                            ? GENRES[selectedGenre]
                            : item;

                        return (
                            <div key={item} style={{ position: 'relative', flexShrink: 0 }} ref={isGenreButton ? dropdownRef : null}>
                                <button
                                    onClick={() => handleNavClick(item)}
                                    className="px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 text-xs sm:text-sm lg:text-base whitespace-nowrap"
                                    style={{
                                        background: isActive ? 'rgba(0, 212, 255, 0.15)' : 'rgba(37, 40, 67, 0.4)',
                                        border: isActive ? '1px solid rgba(0, 212, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontFamily: 'var(--font-display)',
                                        color: isActive ? 'var(--color-cyan)' : 'var(--color-text)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.02em',
                                        borderRadius: '10px',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: isActive ? '0 4px 16px rgba(0, 212, 255, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.2)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 212, 255, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = isActive ? 'rgba(0, 212, 255, 0.15)' : 'rgba(37, 40, 67, 0.4)';
                                        e.currentTarget.style.borderColor = isActive ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isActive ? '0 4px 16px rgba(0, 212, 255, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.2)';
                                    }}
                                >
                                    {buttonText}
                                </button>

                            {item === 'genre' && showGenreDropdown && (
                                <div className="left-0 sm:left-0 w-screen sm:w-auto right-0 sm:right-auto" style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 0.5rem)',
                                    background: 'rgba(26, 29, 53, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(0, 212, 255, 0.2)',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                                    padding: '0.75rem',
                                    minWidth: '220px',
                                    maxWidth: '100vw',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    zIndex: 1000,
                                    animation: 'fadeInScale 0.3s ease-out'
                                }}>
                                    <div
                                        onClick={() => handleGenreClick(null)}
                                        style={{
                                            padding: '0.875rem 1rem',
                                            cursor: 'pointer',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.95rem',
                                            fontWeight: '600',
                                            color: selectedGenre === null ? 'var(--color-cyan)' : 'var(--color-text-muted)',
                                            marginBottom: '0.5rem',
                                            background: selectedGenre === null ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                                            borderLeft: selectedGenre === null ? '3px solid var(--color-cyan)' : '3px solid transparent',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                            paddingBottom: '1rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                                            e.currentTarget.style.color = 'var(--color-cyan)';
                                            e.currentTarget.style.transform = 'translateX(4px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = selectedGenre === null ? 'rgba(0, 212, 255, 0.15)' : 'transparent';
                                            e.currentTarget.style.color = selectedGenre === null ? 'var(--color-cyan)' : 'var(--color-text-muted)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        All Genres
                                    </div>
                                    {Object.entries(GENRES).map(([id, name]) => {
                                        const isSelected = selectedGenre === id;
                                        return (
                                            <div
                                                key={id}
                                                onClick={() => handleGenreClick(id)}
                                                style={{
                                                    padding: '0.875rem 1rem',
                                                    cursor: 'pointer',
                                                    borderRadius: '8px',
                                                    transition: 'all 0.2s ease',
                                                    fontFamily: 'var(--font-body)',
                                                    fontSize: '0.95rem',
                                                    fontWeight: '500',
                                                    color: isSelected ? 'var(--color-cyan)' : 'var(--color-text-muted)',
                                                    marginBottom: '0.25rem',
                                                    background: isSelected ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                                                    borderLeft: isSelected ? '3px solid var(--color-cyan)' : '3px solid transparent'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                                                    e.currentTarget.style.color = 'var(--color-cyan)';
                                                    e.currentTarget.style.transform = 'translateX(4px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = isSelected ? 'rgba(0, 212, 255, 0.15)' : 'transparent';
                                                    e.currentTarget.style.color = isSelected ? 'var(--color-cyan)' : 'var(--color-text-muted)';
                                                    e.currentTarget.style.transform = 'translateX(0)';
                                                }}
                                            >
                                                {name}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
