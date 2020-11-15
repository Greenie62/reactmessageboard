import React, {useState} from 'react'
import Stars from "./Stars"

const CommentDiv = ({hydrate,setHydrate,comment:{_id,comment,author,rating}}) => {


    return (
        <div className="commentDiv">
            <h5>Rating:{rating}</h5>
            <h3>{comment}</h3>
            <h5>By:{author}</h5>
            <div className="likeBar">
            <Stars id={_id}
                   hydrate={hydrate}
                   setHydrate={setHydrate}/>
  
             
            </div>
        </div>
    )
}

export default CommentDiv
