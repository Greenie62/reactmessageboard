const mongoose = require('mongoose');
const slugify = require('../utils/slugify')

const { Schema } = mongoose;


const topicschema=new Schema({
    topic:{
        type:String,
        required:true
    },
    slug:{
        type:String,
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


topicschema.pre('validate',function(next){
    console.log("validate fired")
    if(this.topic){
        console.log('slugify is firing!')
        this.slug = slugify(this.topic)
    }
    next()
})


module.exports = mongoose.model("Topic",topicschema)



