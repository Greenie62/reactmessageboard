import React, {useReducer, useEffect} from "react"


const ACTIONS={
    LOADING:'LOADING',
    ERROR:'ERROR',
    DATA:'DATA',
}

const initialState={
    comments:[],
    loading:false,
    error:false
}


function reducer (state,action){

    const {LOADING, ERROR, DATA } = ACTIONS;

    // console.log("reducer fired")

    switch(action.type){

        case LOADING:
            console.log("loadinReducer fired!")
            return {loading:true}

        case ERROR:
            return {error:true}

        case DATA:
            return{...state, loading:false, comments:action.payload}

        default:
            return state
    }
}


export const useFetchComments=(slug,rehydrate)=>{

            const [state,dispatch] = useReducer(reducer,initialState)

            const {LOADING, ERROR, DATA } = ACTIONS;

            // console.log(state)

            useEffect(()=>{
                dispatch({type:LOADING})

            fetch(`/comments/${slug}`)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                dispatch({
                    type:DATA,
                    payload:res.comments
                })
            })

            },[rehydrate])

            return state;

}