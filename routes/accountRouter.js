const express=require('express')
const Account=require('../models/Account')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const router=express.Router()

router.get('/',(req,res)=>{
    Account.find()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.delete('/:id',(req,res)=>{
    Account.findByIdAndDelete(req.params.id)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.post('/login',(req,res)=>{
    var username=req.body.username
    var password=req.body.password
    Account.findOne({"username" : username})
    .then(function(data){
        if(data){
            bcrypt.compare(password,data.password,(err,same)=>{
                if(same){
                    var token=jwt.sign({_id:data._id},'nghiango')
                    
                    res.status(200).json({
                        token:token,
                        account: data
                    })
                }else{
                    res.status(401).json("password is fault")
                }
            })
        }else{
            res.status(400).json("account is fault")
        }
    })
    .catch(err=>{
        res.status(500).json("server error")
    })

})

router.post('/register',(req,res)=>{
    Account.findOne({
    username: req.body.username
    })
    .then(data=>{
        if(data){
            res.status(400).json("account da ton tai")
        }else{
            Account.create(req.body)
            .then(data=>{
                console.log(data)
                res.json(data)
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json("server error 1")
            })
        }
    })
    .catch(err=>{
        res.status(500).json("server error 2")
    })

})


module.exports=router