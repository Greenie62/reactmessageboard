const router = require('express').Router();
const db = require('./models')

const {confirmPassword, hashPassword} = require("./utils/argon")
const {createToken, signToken} = require("./utils/token")
const createAvatar = require('./utils/avatars')



router.post('/register',async(req,res)=>{
    console.log(req.body);
    let user = await db.Topic.find({username:req.body.username})
    console.log(user)

    if(user){
        console.log("WTF YOU re-registering?")
    }
    let hash = await hashPassword(req.body.password);
    req.body.password = hash;
    db.Member.create(req.body)
    .then(async(dbmember)=>{
        console.log(dbmember)
        let token = await createToken({username:dbmember.username})

        res.json({msg:"Data received!",token})
    })
})


router.post('/login',async(req,res)=>{
    console.log(req.body);

    let dbmember = await db.Member.findOne({username:req.body.username})
    console.log(dbmember)
    if(dbmember === null){
        res.json({member:null})
    }

    let result = await confirmPassword(dbmember.password,req.body.password)
     if(!result){
        res.json({member:false})
    }
    else{
        let token = await createToken(dbmember.username);
        res.json({msg:"Data received!",token})
    }


})


router.post('/addtopic',(req,res)=>{
    console.log(req.body);
    req.body.avatar = createAvatar('new')
    if(!req.body.author){
        console.log("Cant accept post. Invalid user")
    }
    else{
        db.Topic.create(req.body)
        .then(thread=>{
            console.log(thread)
        })
    }

    res.json({msg:"newThread received!"})
})





router.get("/topics",(req,res)=>{
    db.Topic.find()
    .then(topics=>{
        res.json(topics)
    })
})


router.post("/addcomment",async(req,res)=>{
    console.log(req.body);
    let topic= await db.Topic.find({slug:req.body.slug})
    console.log(topic)
    let topicId = topic._id
    if(topic.length){
    topicId = topic[0]._id
    }
    console.log("TopicID: " + topicId)
    req.body.topicId = topicId
    await db.Comment.create(req.body)
    res.json({msg:"Comment has been added!"})
})


router.get('/comments/:slug',async (req,res)=>{

    console.log(req.params.slug)
    let topic = await db.Topic.find({slug:req.params.slug});
    let topicId = topic._id
    if(topic.length){
    topicId = topic[0]._id
    }
    console.log("TopicID: " + topicId)
 
    let comments = await db.Comment.find({topicId})
    console.log(comments)
    let commentsWithRatings=[];
    comments.forEach(c=>{
        let newCommentObj = Object.assign(
            {...c._doc},
            {rating:'no rating!'}
        );
        if(c.review.length){
        let total=c.review.reduce((a,b)=>parseInt(a)+parseInt(b));
        newCommentObj.rating = (total/c.review.length).toFixed(2)
            
        }
   
        commentsWithRatings.push(newCommentObj)

    })
    res.json({comments:commentsWithRatings})
})



router.get('/signtoken',async(req,res)=>{
    let token = req.headers.authorization;

    console.log('TOKEN: ',token)
    token= token.split(" ")[1]
    // console.log(req.body);
    let user = await signToken(token)
    // console.log("USER: " + user)
    res.json({data:'/signtoken fired',user})
})



router.get('/admin',async(req,res)=>{
   let dbmembers = await db.Member.find()
   let dbtopics = await db.Topic.find()

   console.log(dbmembers)
   console.log(dbtopics)

   res.render("admin",{members:dbmembers,topics:dbtopics})
})


router.delete("/delete/:collection/:id",async (req,res)=>{
    if(req.params.collection === "member"){
       await db.Member.findOneAndDelete({_id:req.params.id})
    }
    else{
        await db.Topic.findOneAndDelete({_id:req.params.id})

    }
    res.redirect('/admin')
})


router.get("/api/:collection",async(req,res)=>{
   
if(req.params.collection === "members" || req.params.collection === "users"){
    let members = await db.Member.find()
    res.json({members})
        }
else if(req.params.collection === "topics"){
        let topics = await db.Topic.find()
        res.json({topics})
    }
    
})


router.get("/addreview/:id/:stars",(req,res)=>{
    console.log(req.params)

    db.Comment.findOneAndUpdate({_id:req.params.id},{$push:{review:req.params.stars}})
    .then(dbcomment=>{
        console.log('Comment review updated!');
        res.json({msg:"Update a success! \n Now render that shit!"})
    })
})






module.exports = router;