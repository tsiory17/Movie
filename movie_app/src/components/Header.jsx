import React from 'react'
import Search from "./Search.jsx"

const Header = ({search,setSearch}) => {
    return (
        <header>
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy</h1>
            <Search search={search} setSearch={setSearch}/>
        </header>
    )
}
export default Header

