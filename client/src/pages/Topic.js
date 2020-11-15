import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {FaArrowLeft, FaComment} from "react-icons/fa"
import { CommentDiv } from "../components"

import {useFetchComments} from "../useFetchComments"

const Topic = (props) => {
    let {thread} = props.match.params


    const [dialog, setDialog] = useState(false)
    const [hydrate, setHydrate] = useState(false)
    const [comment,setComment] = useState("")
    const {loading,error,comments} = useFetchComments(thread,hydrate)

    // console.log(props)
    let {user} = props.match.params



    const translate=(slug)=>{
        let str="";
        slug.split("").forEach(char=>{
            if(char === "_"){
                str += " "
            }
            else{
                str += char
            }
        })

        return str;
    }


    const enterComment=()=>{
        var commentObj={
                comment,
                slug:thread,
                author:user
        }
        console.log(commentObj)

        fetch('/addcomment',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(commentObj)
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setHydrate(!hydrate)
        })
    }

  
    return (
        <div className="topicContainer">
            <div className="topicMenuRow">
            <h2 onClick={()=>setDialog(!dialog)}>Comment <FaComment/></h2>
            <textarea placeholder="tell em what you think" name="comment" className={dialog ? 'commentBox' : 'hide-commentBox'} id="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            <button onClick={enterComment} className={dialog ? "commentBtn" : "hide-commentBtn"}>Add Comment</button>
          </div>
            
            <h4><Link to="/messageboard"><FaArrowLeft/></Link></h4>

            <div className="commentContainer">
                <div className="commentRow">
                    <h5>{translate(thread)}</h5>
                    <h5>Comments:{comments ? comments.length : "Loading"}</h5>
                    <small>(click whitespace to clear review)</small>
                </div>
                {loading && "Loading"}
                {error && "Error"}
                {comments && comments.map((c,idx)=>{
                    return(
                        <CommentDiv key={idx}
                                    comment={c}
                                    hydrate={hydrate}
                                    setHydrate = {setHydrate}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Topic
