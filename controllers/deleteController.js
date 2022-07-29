const Locker=require('../models/Locker')
const ControlDevice=require('../models/control_device')
const LU=require('../models/Locker_User')
const Floor=require('../models/Floor')
const Building=require('../models/Building')

async function deleteBuilding(id){
    try{
        let data=await Floor.find({building:id})
        data.forEach(async(item)=>{
            await deleteFloor(item._id)
        })
        await Building.findByIdAndDelete(id);
    }catch(err){
        throw new Error(err);
    }
}

async function deleteFloor(id){
    try{
        let data= await ControlDevice.find({floor:id})
        data.forEach(async(item)=>{
            await deleteController(item._id);
        })
        await Floor.findByIdAndDelete(id);
    }catch(err){
        throw new Error(err);
    }
}

async function deleteController(id){

    try{
        let data=await Locker.find({cd:id})
        console.log(data)
        data.forEach(async(item)=>{
            await deleteLocker(item._id)
        })
        await ControlDevice.findByIdAndDelete(id)
    }catch(err){
        throw new Error(err);
    }

}

 async function deleteLocker(id){
    try{
        const res1= await LU.deleteMany({lockerId:id})
        await Locker.findByIdAndDelete(id)
    }catch(err){
        
        throw new Error(err);
    }
}

module.exports={deleteFloor,deleteController,deleteLocker,deleteBuilding}

