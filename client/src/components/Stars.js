import React, {useState, useEffect} from 'react'
import {FaStar} from "react-icons/fa"


const Stars = ({hydrate,setHydrate,id}) => {
    const [stars,setStars] = useState(0)




    const oneStar=(e)=>{
        
        setStars(1)
        e.target.nextElementSibling.firstElementChild.style.color='black'
        e.target.nextElementSibling.nextElementSibling.firstElementChild.style.color='black'
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.style.color='black'
        // document.querySelectorAll(".star").firstElementChild.style.backgroundColor='black'
        console.log('one star!')
        console.log(e.target)
         e.target.firstElementChild.style.color='red'
    }

    const twoStar=(e)=>{
        
        setStars(2)

        // document.querySelectorAll(".star").firstElementChild.style.backgroundColor='black'

        e.target.nextElementSibling.firstElementChild.style.color='black'
        e.target.nextElementSibling.nextElementSibling.firstElementChild.style.color='black'

        console.log('two star')
        e.target.firstElementChild.style.color='red'
        e.target.previousElementSibling.firstElementChild.style.color='red'

    }

    const threeStar=(e)=>{
        // document.querySelectorAll(".star").firstElementChild.style.backgroundColor='black'
        
        setStars(3)

        e.target.nextElementSibling.firstElementChild.style.color='black'

        console.log('three star!')
        e.target.firstElementChild.style.color='red'
        e.target.previousElementSibling.firstElementChild.style.color='red'
        e.target.previousElementSibling.previousElementSibling.firstElementChild.style.color='red'



    }

    const fourStar=(e)=>{
        
        setStars(4)

        // document.querySelectorAll(".star").firstElementChild.style.backgroundColor='black'

        console.log('four star')
        e.target.firstElementChild.style.color='red'
        e.target.previousElementSibling.firstElementChild.style.color='red'
        e.target.previousElementSibling.previousElementSibling.firstElementChild.style.color='red'
        e.target.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.style.color='red'

    }


    const enterReview=()=>{
        console.log(`User has rated blog with a ${stars} star review.` )
        console.log("Id: " + id)
        fetch(`/addreview/${id}/${stars}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setHydrate(!hydrate)
        })
    }


    const clearReview=(e)=>{
        console.log(e.target)
        if(e.target.className !== "star"){
            console.log(e.target.children)
            let stars = Array.from(e.target.children).splice(0,4)
            stars.forEach(c=>{
                console.log(c.firstElementChild)
                console.log(c)
                 c.firstElementChild.style.color='black'
                setStars(0)
            })
        }
    }

    


  
    return (
        <div onClick={(e)=>clearReview(e)} className="starWrapper">
        <div className='starRow'>
          
     <div className="star" onClick={(e)=>oneStar(e)}>
         <FaStar style={{pointerEvents:"none"}}/>
     </div>
     <div className="star" onClick={(e)=>twoStar(e)}>
         <FaStar style={{pointerEvents:"none"}}/>
     </div>
     <div className="star" onClick={(e)=>threeStar(e)}>
         <FaStar style={{pointerEvents:"none"}}/>
     </div>
     <div className="star" onClick={(e)=>fourStar(e)}>
         <FaStar style={{pointerEvents:"none"}}/>
     </div>
          {stars > 0 && <button className='submitReviewBtn' onClick={enterReview}>Submit</button>}  
        </div>
        </div>
    )
}

export default Stars
