const argon = require('argon2');


 const hashPassword = async(pw)=>{

    let hash = await argon.hash(pw);

    return hash;
}


 const confirmPassword = async(hash,pw)=>{

    let result = await argon.verify(hash,pw);

        return result;
}



module.exports = { hashPassword, confirmPassword }