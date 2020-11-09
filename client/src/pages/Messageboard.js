import React, {useEffect, useState} from 'react'
import {UserPanel, TopicDiv, AddTopic} from "../components"
import { useFetchTopics } from "../useFetchTopics"




const Messageboard = () => {

    const [user,setUser] = useState("")
    const [display,setDisplay] = useState(false)
    const [topic, setTopic] = useState("pizza")
    const {loading,error,topics} = useFetchTopics(topic)


    useEffect(()=>{

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
                setUser(res.user.username)
            })
        }


        },[])



    return (
        <div className="messageboardContainer">
            <UserPanel display={display} setDisplay={setDisplay} user={user}/>
            <AddTopic display={display} user={user}/>
            <div className='messageboardWrapper'>
            {loading && "LOADING..."}
            {error && "ERROR..."}
            {topics && topics.map((t,idx)=>(
                <TopicDiv key={idx}
                         topic={t}/>
    
            ))}
            </div>
        </div>
    )
}

export default Messageboard
