import React from "react"
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom"
import {Login, Messageboard,Error404} from "./pages"
import {FaComment} from "react-icons/fa"

import "./App.css"



const App = () =>{



    return(
        <div className="app">
            
            <div className="header">
                <h1>Justins Nginx MessageBoard <span className="headerIcon"><FaComment/></span></h1>
            </div>
            
            <Router>
                <Switch>
                {window.location.pathname === "/" ? <Redirect to="/login"/> : null}
                <Route exact path="/login" render={(props)=> <Login {...props}/>}/>
                <Route exact path="/messageboard" component={Messageboard}/>
                <Route path="/:url" component={Error404}/>
                </Switch>
            </Router>
            
            <div className="footer">
                <p>Footer&copy;</p>
            </div>
        </div>
    )
}

export default App;