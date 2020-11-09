import React from 'react'

const TopicDiv = ({topic:{topic,author}}) => {
  

    return (
        <div className='topicDiv'>
            <h1>Topic:{topic}</h1>
            <h3>Author:{author}</h3>
        </div>
    )
}

export default TopicDiv
