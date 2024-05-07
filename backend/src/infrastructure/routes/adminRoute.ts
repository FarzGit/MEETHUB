import express,{NextFunction,Request,Response} from 'express'
import { adminAdapter } from './injection/adminInjection'



const adminRoute = express.Router()



adminRoute.post('/admin-login',(req:Request,res:Response,next:NextFunction)=>{
    adminAdapter.adminLogin(req,res,next)

})

adminRoute.get('/get-users',(req:Request,res:Response,next:NextFunction)=>{
    adminAdapter.getUser(req,res,next)

})

adminRoute.patch('/block-user',(req:Request,res:Response,next:NextFunction)=>{
    adminAdapter.blockUser(req,res,next)

})









export default adminRoute