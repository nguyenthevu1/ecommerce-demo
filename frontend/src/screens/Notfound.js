import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center align-items-center">
                    <h4 className="text-center mb-2 mb-dm-5">Page Not Found</h4>
                </div>
                <button>
                    <Link to="/">
                        Home Page
                    </Link>
                </button>
            </div>
        </>
    )
}

export default Notfound