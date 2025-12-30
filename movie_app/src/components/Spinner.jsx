import React from 'react'

const Spinner = () => {
    return (
        <div className="mt-10 flex items-center justify-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                <div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00d4ff] animate-spin"
                    style={{
                        filter: 'drop-shadow(0 0 12px rgba(0, 212, 255, 0.6))',
                        animationDuration: '1.2s'
                    }}
                />

                <div
                    className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#fbbf24] animate-spin"
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))',
                        animationDuration: '1.5s',
                        animationDirection: 'reverse'
                    }}
                />

                <div
                    className="absolute inset-4 rounded-full border-4 border-transparent border-t-[#0ea5e9] animate-spin"
                    style={{
                        filter: 'drop-shadow(0 0 6px rgba(14, 165, 233, 0.4))',
                        animationDuration: '0.9s'
                    }}
                />

                <div
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div
                        className="w-3 h-3 rounded-full bg-[#00d4ff]"
                        style={{
                            boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default Spinner
