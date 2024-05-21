import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IResponse } from "../../interface/services/Iresponse";



export const blockUser = async(
    userRepository:IUserRepository,
    _id:string
):Promise<IResponse>=>{
    try {

       console.log('entere the usecase:',_id)
       const block= await userRepository.blockUser(_id)
       console.log('the status of block in usecase is :',block)
       
        return{
            status:200,
            success:true,
            data:block,
            message:'Successfully Updated'
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}