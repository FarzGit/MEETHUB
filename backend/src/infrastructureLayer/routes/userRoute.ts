
import express,{NextFunction,Request,Response} from 'express'
import { userAdapter } from './injection/userInjection'


const router = express.Router()


router.post('/signUp',(req:Request,res:Response,next:NextFunction)=>{
    console.log('entered into route')

    userAdapter.createUser(req,res,next)


})








export default router