const mongoose = require('mongoose');

const { Schema } = mongoose;


const memberschema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    reputation:{
        type:Number,
        default:0
    },
    messages:{
        type:Array,
        default:[]
    }
})


module.exports = mongoose.model("Member",memberschema)



