const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ULSchema=new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    lockerId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Locker'
    }
})

module.exports = mongoose.model('Locker_User',ULSchema)