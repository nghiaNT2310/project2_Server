const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt')

const accountSchema=new Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        require: true,
        default: 0
    }
})

accountSchema.pre('save',function(next){
    const account=this
    bcrypt.hash(account.password,10,(err,hash)=>{
        account.password=hash
        next()
    })
})

const AccountModel=mongoose.model('account',accountSchema);
module.exports=AccountModel