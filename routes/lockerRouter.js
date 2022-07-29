const express=require('express')
const router=express.Router()
const ControlDevice=require('../models/control_device')
const Locker=require('../models/Locker')
const LU=require('../models/Locker_User')
const User=require('../models/User')
router.get('/',(req,res)=>{
    Locker.find()
    .populate({
        path:'cd',
        populate: {
            path: 'floor',
            populate:{path:'building'}
         }
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})


router.put('/:id',(req,res)=>{
    Locker.findByIdAndUpdate(req.params.id,req.body)
    .then(data=>{
        console.log(data)
        res.json("da update")
    }) 
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.delete('/:id',(req,res)=>{
    Locker.findByIdAndUpdate(req.params.id,{label:""})
    .then(data=>{
        LU.deleteMany({lockerId:req.params.id})
        .then(d=>{
            res.json("da xoa")
        })
        .catch(err=>{
            res.status(500).json("server error")
        }) 
    }) 
    .catch(err=>{
        res.status(500).json("server error")
    })
})


module.exports = router