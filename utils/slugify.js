


function slugify(str){
    let slug=""
     str.split("").forEach(char=>{
         if(char === " "){
             slug+="_"
         }
         else{
             slug+=char.toLowerCase()
         }
        });

        console.log(slug)
        return slug
}


module.exports = slugify;