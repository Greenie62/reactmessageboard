import React, {useEffect, useState} from 'react'
import {UserPanel, TopicDiv, AddTopic, CommentDiv} from "../components"
import { useFetchTopics } from "../useFetchTopics"




const Messageboard = () => {

    const [user,setUser] = useState("")
    const [display,setDisplay] = useState(false)
    const [newFetch,setNewFetch] = useState(true)
    const {loading,error,topics} = useFetchTopics(newFetch)


    useEffect(()=>{
        console.log("Token: " + localStorage.token)
        if(localStorage.token === undefined){
            console.log("unauthorized")
            window.location.pathname="/login"
            }
        else{
            
            fetch('http://localhost:3005/signtoken',{
                headers:{
                    'authorization' : `Bearer ${localStorage.token}`
                }
            })
            .then(res=>res.json())
            .then(res=>{
                // console.log(res)
                setUser(res.user)
            })
        }


        },[])



    return (
        <div className="messageboardContainer">
            <UserPanel display={display} setDisplay={setDisplay} user={user}/>
            <AddTopic display={display} 
                      user={user}
                      newFetch={newFetch}
                      setNewFetch={setNewFetch}/>
            
            <div className='messageboardWrapper'>
            {loading && "LOADING..."}
            {error && "ERROR..."}
            {topics && topics.map((t,idx)=>(
                <TopicDiv key={idx}
                         topic={t}
                          user={user}/>
    
            ))}
            </div>
        </div>
    )
}

export default Messageboard
