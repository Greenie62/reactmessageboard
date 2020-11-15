import React, {useState} from 'react'

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")
    const [disable,setDisable] = useState(true)


    const registerUser=()=>{
        fetch('/register',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({username,password})
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            localStorage.token = res.token;
            props.history.push("/messageboard")
        })
    }

    const loginUser=()=>{
        console.log('loginUser fired!')
        fetch('/login',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({username,password})
        })
        .then(res=>res.json())
        .then(res=>{
             console.log(res)
             if(res.member === null){
                 setError("Error! That user doesn't exist!")
                 setTimeout(()=>{
                     setError("")
                     setUsername("")
                     setPassword("")
                 },1500)
                }
            else if(res.member === false){
                setError("Error! Invalid password!")
                setTimeout(()=>{
                    setError("")
                    setUsername("")
                    setPassword("")
                },1500)
            }
            else{
                localStorage.token=res.token;
                props.history.push("/messageboard")
            }
             })
            // localStorage.token = res.token;
            // props.history.push("/messageboard")
        

    }

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <div className="loginCardHeader">
                    <h2>- Login -</h2>
                    {error}
                </div>
                <div className="loginForm">
                    <div className="formDiv">
                        <label htmlFor="username">Username:</label>
                        <input type="text" autoFocus={true} className="logininput" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} placeholder="username..." autoComplete="off" value={username}/>
                    </div>
                    <div className="formDiv">
                        <label htmlFor="password">Password:</label>
                        <input type="text" onKeyDown={()=>{
                            password.length >= 3 ? setDisable(false) : setDisable(true)
                                                            }} 
                        className="logininput" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password..." autoComplete="off" value={password}/>
                    </div>
                    
                    <div className="formDiv">
                        <button disabled={disable} className="loginBtn" onClick={loginUser}>Login</button>
                        <button disabled={disable} className="registerBtn" onClick={registerUser}>Register</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login
