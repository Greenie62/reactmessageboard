import React, {useState} from 'react'

const AddTopic = ({display,user,newFetch,setNewFetch}) => {
    const [topic,setTopic] = useState("")


    const postTopic=()=>{
            console.log({topic,author:user})

            fetch("/addtopic",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({topic,author:user})
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                // window.location.reload()
            })
            setNewFetch(!newFetch)
            
    }



    return (
        <div className="addTopicRow" style={{display:display ? 'block' : 'none'}}>
            <div className="addTopicDiv">
                <label htmlFor="topic">- Add a Topic -</label>
                <input type="text" className="topicinput" placeholder="topic..." autoComplete="off" id="topic" value={topic} name="topic" onChange={(e)=>setTopic(e.target.value)}/>
                <button onClick={postTopic} className="addBtn">POST</button>
            </div>
        </div>
    )
}

export default AddTopic
