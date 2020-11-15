import React from 'react'
import {Link} from "react-router-dom"

const TopicDiv = ({user,topic:{topic,author,avatar,created_at,slug}}) => {
  

    return (
        <div className='topicDiv'>
            <div className="avatarColumn">
                <h1>{avatar}</h1>
            </div>
            <div className="topicContentColumn">
           <Link className="topiclink" to={`/topic/${user}/${slug}`}>  
           <h2 className="topich2">{topic}</h2>
           </Link>
            <div className="topicContentRow">
                <h4 className="topich4">Author:{author}</h4>
                <h4 className='dateh4'>{created_at}</h4>
            </div>
            </div>
            
        </div>
    )
}

export default TopicDiv
