import React from 'react'
import { Link } from "react-router-dom"
import {FaHome} from "react-icons/fa"

const Error404 = () => {
    return (
        <div className="errorDiv">
            <h1>ERROR 404</h1>
            <Link to="/login"> <FaHome/></Link>
           
        </div>
    )
}

export default Error404
