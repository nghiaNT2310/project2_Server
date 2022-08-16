const express=require('express')
const app=express()
const router=require('./routes/index.js')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')


app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())

const port=4000

app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "*");
   next()
  });

// connect to database 
async function connect() {
    try {
       // await mongoose.connect('mongodb://localhost/smartLocker', {
        await mongoose.connect('mongodb+srv://nghiango:nghiango23102001@cluster0.pjnmw.mongodb.net/IOT?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Successfully!!');
    } catch (error) {
        console.log('Connect failure!!');
    }
}

connect()



router(app)

app.listen(port,()=>{
    console.log("App listening at http://localhost:4000")
})