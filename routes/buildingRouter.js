const express=require('express')
const { deleteBuilding } = require('../controllers/deleteController')
const router=express.Router()
const Building=require('../models/Building')


router.get('/',(req,res)=>{
    Building.find({})
    .then(buildings=>{
        res.json(buildings)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})


router.get('/:id',(req,res)=>{
    Building.findOne({_id: req.params.id})
    .then(building=>{
        res.json(building)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.post('/',(req,res)=>{
    if(!req.body.name||!req.body.address) res.status(400).json("Thieu du lieu")
    else{
        Building.create(req.body)
        .then(data=>{
            console.log(data)
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json("server error")
        })
    }
})

// router.delete('/:id',(req,res)=>{
//     Building.findByIdAndDelete(req.params.id)
//     .then(data=>{
//         if(data){
//         res.json("da xoa")
//         }else{
//         res.json("id not found")
//         }
//     })
//     .catch(err=>{
//         console.log(err)
//         res.status(500).json("server error")
//     })
// })

router.delete('/:id',async (req,res)=>{
    try{
        await deleteBuilding(req.params.id)
        res.json('da xoa')
    }catch(err){
        res.status(500).json("server error")
    }
})

router.put('/:id',(req,res)=>{
    Building.findByIdAndUpdate(req.params.id,req.body)
    .then(data=>{
        if(data){
            res.json("da update")
            }else{
            res.json("id not found")
            }
    })
    .catch(err=>{
        res.status.json("server error")
    })
})

module.exports=router