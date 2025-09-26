import React from 'react'

const Pagination = ({pagination,setPagination}) => {
    return (
        <div>
            <button className="text-white" onClick={()=>{console.log("clicked prev");setPagination(prevPagination => prevPagination - 1)}}>Prev</button>

            <button className="text-white" onClick={()=>setPagination(prevPagination => prevPagination + 1)}>Next</button>
        </div>
    )
}
export default Pagination
