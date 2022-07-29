const express=require('express')
const router=express.Router()
const {deleteFloor,deleteController,deleteLocker}=require('../controllers/deleteController')

router.delete('/locker/:id',async (req,res)=>{
    try{
        await deleteController(req.params.id)
        res.json('da xoa')
    }catch(err){
        console.log(err)
        res.status(500).json("server error")
    }
})

router.delete('/floor/:id',async (req,res)=>{
    try{
        await deleteFloor(req.params.id)
        res.json('da xoa')
    }catch(err){
        console.log(err)
        res.status(500).json("server error")
    }
})

module.exports=router