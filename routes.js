const router = require('express').Router();
const db = require('./models')

const {confirmPassword, hashPassword} = require("./utils/argon")
const {createToken, signToken} = require("./utils/token")
const createAvatar = require('./utils/avatars')



router.post('/register',async(req,res)=>{
    console.log(req.body);
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

    res.json({msg:"loginInfo received!"})
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

router.post('/addcomment',(req,res)=>{
    console.log(req.body);

    res.json({msg:"newComment received!"})
})




router.get("/topics",(req,res)=>{
    db.Topic.find()
    .then(topics=>{
        res.json(topics)
    })
})

router.get('/signtoken',async(req,res)=>{
    let token = req.headers.authorization;

    console.log('TOKEN: ',token)
    token= token.split(" ")[1]
    // console.log(req.body);
    let user = await signToken(token)

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




module.exports = router;