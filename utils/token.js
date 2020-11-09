const jwt = require('jsonwebtoken');
const SECRET = 'kdjeifodij39394i20fjkejrKDJifeo393KDlio29LDKJFkekd29'




 const createToken=async(payload)=>{

    let token = await jwt.sign(payload,SECRET);

    console.log(token);

    return token;
}


 const signToken = async(token)=>{

    let user = await jwt.verify(token,SECRET);

    return user
}


module.exports ={
    signToken,createToken
}