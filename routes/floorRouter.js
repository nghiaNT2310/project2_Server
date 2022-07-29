const express=require('express')
const router=express.Router()
const Floor=require('../models/Floor')
const Building=require('../models/Building')
const {deleteFloor,deleteController,deleteLocker}=require('../controllers/deleteController')

router.get('/',(req,res)=>{
    Floor.find({})
    .populate('building')
    .then(buildings=>{
        res.json(buildings)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.get('/building/:buildingId',(req,res)=>{
    Floor.find({building: req.params.buildingId})
    .populate('building')
    .then(buildings=>{
        
        res.json(buildings)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.get('/:id',(req,res)=>{
    Floor.findOne({_id: req.params.id})
    .populate('building')
    .then(building=>{
        res.json(building)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

// router.post('/:buildingId',(req,res)=>{
//     console.log(req.params.buildingId)
//     if(!req.body.name) res.status(500).json("nhap thieu du lieu")
//     else{
//         Building.findById( req.params.buildingId)
//         .then(build=>{
//             if(build){
//                 req.body.building=req.params.buildingId
//                 Floor.create(req.body)
//                 .then(data=>{
//                     res.json(data)
//                 })
//                 .catch(err=>{
//                     res.status(500).json("server error")
//                 })
//             }else{
//                 console.log(build)
//                 res.json("Toa nha da xoa hoac khong ton tai")
//             }
//         })
//         .catch(err=>{
//             res.status(500).json("server error")
//         })
//     }
// })

router.post('/',(req,res)=>{
    if(!req.body.name) res.status(500).json("nhap thieu du lieu")
    else{
        Floor.create(req.body)
        .then(build=>{
            res.json(build)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
        
    }
})

// router.delete('/:id',(req,res)=>{
//     Floor.findByIdAndDelete(req.params.id)
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

router.delete('/:id',async(req,res)=>{
    try{
        await deleteFloor(req.params.id)
        res.json('da xoa')
    }catch(err){
        res.status(500).json("server error")
    }
})

router.put('/:id',(req,res)=>{
    Floor.findByIdAndUpdate(req.params.id,req.body)
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