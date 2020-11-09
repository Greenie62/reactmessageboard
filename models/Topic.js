const mongoose = require('mongoose');

const { Schema } = mongoose;


const topicschema=new Schema({
    topic:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:new Date()
    },
    author:{
        type:String,
    },
    avatar:{
        type:String,
    }
})


module.exports = mongoose.model("Topic",topicschema)



