const accountRouter=require('./accountRouter')
const userRouter=require('./userRouter')
const buildingRouter=require('./buildingRouter')
const floorRouter=require('./floorRouter')
const controlDeviceRouter=require('./controlDeviceRouter')
const lockerRouter=require('./lockerRouter')
const user_lockerRouter=require('./lockerUserRouter')
const checkLogin=require('../middlewares/checkLogin')
const testRouter=require('./test')
function router(app){
    app.use('/',accountRouter)
    app.use('/user',userRouter)
    app.use('/building',buildingRouter)
    app.use('/floor',floorRouter)
    app.use('/controlDevice',controlDeviceRouter)
    app.use('/locker',lockerRouter)
    app.use('/user_locker',user_lockerRouter)
    app.use('/test',testRouter)
}


module.exports=router

