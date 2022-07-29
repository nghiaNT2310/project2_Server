const mongoose=require('mongoose')
const Schema=mongoose.Schema

const LockerSchema=new Schema({
    cd:{
        type: String,
        ref: 'ControlDevice'
    },
    label: String,
    stt: Number
})

module.exports=mongoose.model('Locker',LockerSchema)