import React from 'react'

const Search = (props) => {
    return (
        <div className="search">
            <div>
                <img className="h-4 w-4 sm:h-5 sm:w-5" src={"search.svg"}></img>
                <input
                    type="text"
                    placeholder="Search..."
                    value={props.search}
                    onChange={(event) => props.setSearch(event.target.value)}/>
            </div>
        </div>
    )
}
export default Search
