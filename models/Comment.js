const mongoose = require('mongoose');

const { Schema } = mongoose;


const commentschema=new Schema({
    comment:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:new Date()
    },
    author:{
        type:String,
    }
})


module.exports = mongoose.model("Comment",commentschema)



