const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')


const app = express();
const PORT = process.env.PORT || 3005;
const routes = require('./routes');


mongoose.connect(`mongodb+srv://brat:booba@cluster0.lfuba.mongodb.net/mongomessageboarddb?retryWrites=true&w=majority`,{
    useUnifiedTopology: true,useNewUrlParser: true
},()=>{
    console.log("Mongo is running")
})




if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})
}
else {
    app.use(express.static("public"));
}





app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())





app.use(routes)


app.use(urlError)
app.use(errorHandler)

function urlError(req,res,next){
    res.status(404);
    let error = new Error(`Error--${req.originalUrl}`)
    next(error)
}

function errorHandler(err,req,res,next){
    res.status(500);
    res.json({
        message:err.message,
        stack:err.stack,
        custom:"You goofed! :("
    })
}



app.listen(PORT,console.log(`Logged onto port ${PORT}, ${process.env.USER}`))