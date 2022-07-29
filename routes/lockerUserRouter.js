const express=require('express')
const router=express.Router()
const UL=require('../models/Locker_User')
const Locker=require('../models/Locker')
const User=require('../models/User')


router.get('/tk',async(req,res)=>{
    try{
        var cntUser=await User.count({});
        var cntLocker=await Locker.count({label:{$ne: ""}})
        var ul=await UL.find({});
        var arrUser=[],arrLocker=[];
        ul.forEach(item=>{
            if(!arrUser.includes(item.userId)) arrUser.push(item.userId);
            if(!arrLocker.includes(item.lockerId)) arrLocker.push(item.lockerId);
        })
        console.log()
        res.json({
            cntUser: cntUser,
            cntLocker:cntLocker,
            cntUserHasLocker: arrUser.length,
            cntLockerUsed: arrLocker.length
        })
    }catch(err){
        console.log(err);
        res.status(500).json("server error");

    }
})

router.post('/add',(req,res)=>{
   console.log(req.body)
    let users=req.body.users
    
    users=users.split(',')
    let lockers=req.body.lockers
    
    lockers=lockers.split(',')
    var arr=[]

    UL.find()
    .then(data=>{
        for(let i=0;i<users.length;i++){
            for(let j=0;j<lockers.length;j++){
                var check=data.every(value=>{
                    return value.userId!=users[i] || value.lockerId!=lockers[j]
                })

                if(check) arr.push({userId: users[i],lockerId:lockers[j]})
            }
        }
        UL.create(arr)
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json("server error")
        })
    })
    .catch(err=>{
        res.status(500).json("server error")
    })

})

router.get('/',(req,res)=>{
    UL.find()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.get('/:id',(req,res)=>{
    UL.find({userId:req.params.id})
    .populate({
        path:'lockerId',
        populate:{
                path:'cd',
                populate: {
                    path: 'floor',
                    populate:{path:'building'}
            }
        }
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.delete('/user/:id',(req,res)=>{
    UL.deleteMany({userId:req.params.id})
    .then(data=>{
        res.json("delete successful")
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

router.delete('/locker/:id',(req,res)=>{
    UL.deleteMany({lockerId:req.params.id})
    .then(data=>{
        res.json("delete successful")
    })
    .catch(err=>{
        res.status(500).json("server error")
    })
})

module.exports=router