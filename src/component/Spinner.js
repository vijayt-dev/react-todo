import React from 'react'

function Spinner() {
    return (
        <div className="d-flex justify-content-center mt-3">
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner