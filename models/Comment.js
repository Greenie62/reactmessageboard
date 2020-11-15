const mongoose = require('mongoose');

const { Schema } = mongoose;


const commentschema=new Schema({
    comment:{
        type:String,
        required:true
    },
    topicId:{
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
    review:{
        type:Array,
        default:[]
    }
})


module.exports = mongoose.model("Comment",commentschema)



