const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const buildingSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    info: String,
    
})

const buildingModel=mongoose.model("Building",buildingSchema)
module.exports=buildingModel