import React from 'react'

const Spinner = () => {
    return (
        <div className="mt-10 flex items-center justify-center" >
            <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-purple-600 animate-spin"></div>
                <div className="absolute top-0 w-24 h-24 rounded-full border-t-4 border-b-4 border-[#00ff00] animate-spin rotate-45"></div>
                <div className="absolute top-0 w-24 h-24 rounded-full border-t-4 border-b-4 border-[#0066ff] animate-spin rotate-90"></div>
            </div>
        </div>
    )
}
export default Spinner
