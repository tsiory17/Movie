import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV, GENRES } from '../constants/constants';

const Navbar = () => {
    const navigate = useNavigate();
    const [showGenreDropdown, setShowGenreDropdown] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleNavClick = (item) => {
        if (item === 'home') {
            navigate('/');
        } else if (item === 'genre') {
            setShowGenreDropdown(!showGenreDropdown);
        }
    };

    return (
        <nav style={{
            background: '#fff',
            padding: '1rem 2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div
                    onClick={() => navigate('/')}
                    style={{
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#1a1a1a'
                    }}
                >
                    🎬 MovieApp
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {NAV.map((item) => (
                        <div key={item} style={{ position: 'relative' }} ref={item === 'genre' ? dropdownRef : null}>
                            <button
                                onClick={() => handleNavClick(item)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    color: '#333',
                                    textTransform: 'capitalize',
                                    padding: '0.5rem 1rem',
                                    transition: 'color 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.color = '#0066cc'}
                                onMouseOut={(e) => e.target.style.color = '#333'}
                            >
                                {item}
                            </button>

                            {item === 'genre' && showGenreDropdown && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    background: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    padding: '0.5rem',
                                    minWidth: '200px',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    zIndex: 1000
                                }}>
                                    {Object.entries(GENRES).map(([id, name]) => (
                                        <div
                                            key={id}
                                            style={{
                                                padding: '0.75rem 1rem',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
                                            onMouseOut={(e) => e.target.style.background = 'transparent'}
                                        >
                                            {name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
