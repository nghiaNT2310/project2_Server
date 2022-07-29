const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const FloorSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    info: String,
    building:{
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    }

})

const floorModel=mongoose.model("Floor",FloorSchema)
module.exports=floorModel