const express=require('express')
const router=express.Router()
const User=require('../models/User')
const UL=require('../models/Locker_User')
const checkLogin=require('../middlewares/checkLogin')

router.get('/',(req,res)=>{
    User.find({})
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.get('/:id',(req,res)=>{
    User.findOne({_id: req.params.id})
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.post('/',(req,res)=>{
    console.log(req.body);
    if(!req.body.ID_Employee||!req.body.name||!req.body.statusPINCode) res.status(400).json("Thieu du lieu")
    else{
    User.findOne({
        ID_Employee: req.body.ID_Employee
    })
    .then(data=>{
        if(data){
            console.log(data)
            res.status(400).json("id da ton tai")
        }else{
            User.create(req.body)
            .then(data=>{
                console.log(data)
                res.json(data)
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json("server error")
            })

        }
    })
    .catch(err=>{
        res.status(501).json("server error")
    })
    }
})

router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(data=>{
        if(data){
            UL.deleteMany({userId: req.params.id})
            .then(data=>{
                res.json("da xoa")
            })
            .catch(err=>{
                res.status(500).json("server error")
            })
        }else{
        res.json("id not found")
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json("server error")
    })
})

router.put('/:id',(req,res)=>{
    User.findByIdAndUpdate(req.params.id,req.body)
    .then(data=>{
        if(data){
            res.json("da update")
            }else{
            res.status(400).json("id not found")
            }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json("server error")
    })
})

module.exports=router