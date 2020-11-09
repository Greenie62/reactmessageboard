import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {FaPlus, FaUser, FaArrowLeft} from "react-icons/fa"

const UserPanel = ({user, display, setDisplay}) => {
    let [date,setDate] = useState(()=>new Date().toDateString())
    return (
        <div className='userPanelRow'>
            <h5><Link to="/login"><FaArrowLeft/></Link></h5>
            <h5> <FaUser/> </h5>
            <h3>Welcome {user}</h3>
            <h5>{date}</h5>
            <h5 onClick={()=>setDisplay(!display)} className='h5AddSign'>
                <FaPlus/>
            </h5>
        </div>
    )
}

export default UserPanel
