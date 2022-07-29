const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    ID_Employee: {
        type: String,
        required: true
    },
    department: String,
    email: String,
    VIP: Number,
    statusPINCode:{
        type: String,
        required: true
    },
    card: String,
    
})

const userModel=mongoose.model('user',userSchema)
module.exports=userModel