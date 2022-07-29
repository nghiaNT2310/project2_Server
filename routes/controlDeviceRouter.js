const express=require('express')
const router=express.Router()
const Floor =require('../models/Floor')
const Locker=require('../models/Locker')
const ControlDevice=require('../models/control_device')
const {deleteFloor,deleteController,deleteLocker}=require('../controllers/deleteController')

router.get('/',(req,res)=>{
    ControlDevice.find({})
    .populate({
        path:'floor',
        populate: {path: 'building'}
    })
    .then(cd=>{
        res.json(cd)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.get('/:id',(req,res)=>{
    ControlDevice.findById(req.params.id)
    .populate({
        path:'floor',
        populate: {path: 'building'}
    })
    .then(cd=>{
        res.json(cd)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.post('/',(req,res)=>{
    ControlDevice.create(req.body)
    .then(cd=>{
        var arr=[];
        for(var i=0;i<40;i++){
            arr.push({cd: cd._id, stt: i+1, label:""})
        }
        Locker.insertMany(arr)
        .then(data=>{
            console.log(data)
            res.redirect('/controlDevice/'+cd._id)
        })
        .catch(err=>{
            res.status(500).json("server error")
        })

       
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

// router.delete('/:id',(req,res)=>{
//     ControlDevice.findByIdAndDelete(req.params.id)
//     .then(data=>{
//         Locker.deleteMany({cd:req.params.id})
//         .then(data=>{
//             console.log("conten delete: ",data)
//             res.json('da xoa')
//         })
//         .catch(err=>{
//             res.status(500).json("server error")
//         })
//     })
//     .catch(err=>{
//         res.status(500).json("server error")
//     })
// })

router.delete('/:id',async (req,res)=>{
    try{
        await deleteController(req.params.id)
        res.json('da xoa')
    }catch(err){
        res.status(500).json("server error")
    }
})

router.put('/:id',(req,res)=>{
    ControlDevice.findByIdAndUpdate(req.params.id,req.body)
    .then(data=>{
        
        //res.redirect('/controlDevice/'+req.params.id)

        ControlDevice.findById(req.params.id)
            .populate({
                path:'floor',
                populate: {path: 'building'}
            })
            .then(cd=>{
                res.json(cd)
            })
            .catch(err=>{
                res.status(500).json("server error")
            })
    
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

module.exports=router