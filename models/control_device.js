const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const controlDeviceSchema=new Schema({
    floor:{
        type: Schema.Types.ObjectId,
        ref: 'Floor',
        required: true
    },
    imei:{
        type:String,
        required: true
    },
    mac:{
        type:String
    },
    area:{
        type: String
    },
    lastUse:{
        type: Date,
        default: new Date()
    }
})

const controlDeviceModel=mongoose.model("ControlDevice",controlDeviceSchema)
module.exports=controlDeviceModel