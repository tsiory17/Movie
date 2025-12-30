import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12" style={{
            background: 'rgba(26, 29, 53, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(0, 212, 255, 0.1)',
            marginTop: '4rem',
            boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    <div>
                        <div className="text-xl sm:text-2xl" style={{
                            fontWeight: '800',
                            fontFamily: 'var(--font-display)',
                            background: 'linear-gradient(135deg, var(--color-cyan) 0%, var(--color-amber) 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span className="text-2xl sm:text-3xl">🎬</span>
                            <span>Movie App</span>
                        </div>
                        <p className="text-sm sm:text-base" style={{
                            color: 'var(--color-text-muted)',
                            lineHeight: '1.6',
                            fontFamily: 'var(--font-body)'
                        }}>
                            Helps you discover and explore thousands of movies and TV shows.
                            <br />
                            <span className="text-xs sm:text-sm" style={{
                                fontWeight: '700',
                                fontStyle: 'italic',
                                opacity: '0.8'
                            }}>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
                        </p>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <p className="text-xs sm:text-sm" style={{
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-body)',
                        textAlign: 'center',
                        margin: 0,
                        fontStyle: 'italic'
                    }}>
                        Created by Tsiory Rakotoarimanana
                    </p>
                    <p className="text-sm sm:text-base" style={{
                        color: 'var(--color-text-muted)',
                        fontFamily: 'var(--font-body)',
                        textAlign: 'center',
                        margin: 0
                    }}>
                        &copy; {currentYear} Movie App. All rights reserved.
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '1.5rem'
                    }}>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
