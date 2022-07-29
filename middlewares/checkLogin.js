const Account=require('../models/Account')
const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    console.log('token',req.headers)
    if(req.headers.token){
        try{
            let token=req.headers.token
            console.log('l',token)
            //token=token.slice(1,token.length-1)
            let data=jwt.verify(token,'nghiango')

            Account.findById(data._id)
            .then(data=>{
                console.log('da vao')
            if(!data){
            
                res.status(410).json("you need login")
               
            }
            else {
                next()
            }

        })
        .catch(err=>{
            console.log('e in check:',err)
            res.status(500).json("server error")
        })
        }catch(err){
            console.log('e2:',err)
            res.status(415).json("token incorrect")
        }
    }else{
        res.status(410).json("you need login")
    }
}