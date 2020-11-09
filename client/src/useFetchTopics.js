import React, {useEffect,useReducer} from "react"


const initialState={
    loading:false,
    error:false,
    topics:[]
}

const ACTIONS={
    LOADING:"LOADING",
    ERROR:"ERROR",
    DATA:"DATA"
}


const reducer = (state,action) =>{

    const {LOADING, ERROR, DATA} = ACTIONS;


    switch(action.type){

        case LOADING:
            return {
                ...state,
                loading:true,}
        
        case DATA:
            return {
                ...state,
                loading:false,
                topics:action.payload
            }

        case ERROR:
            return {error:true}

        default:
            return state;
    }

}


export const useFetchTopics = (topic)=>{

    const {LOADING, ERROR, DATA} = ACTIONS;
    const [state,dispatch] = useReducer(reducer,initialState)

    useEffect(()=>{
        dispatch({type:LOADING})
        console.log("useHook fired!")
       
       fetch('/topics')
       .then(res=>res.json())
       .then(res=>{
           console.log(res)
            dispatch({
                type:DATA,
                payload:res
                // payload:[{topic:'grrr',author:"wtf"}]
            })
        })
            

        
    },[topic])

    // console.log(state)

        return state;

}