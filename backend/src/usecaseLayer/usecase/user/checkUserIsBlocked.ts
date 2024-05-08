import { IUserRepository } from "../../interface/repository/IuserRepository";
import {IUserResponse } from "../../interface/services/Iresponse";




export const checkUserIsBlocked =async (
    userRepository:IUserRepository,
    email:string
):Promise<IUserResponse>=>{
    try{

        const user = await userRepository.findUser(email)

        return {
            status:200,
            success:true,
            data:user?.isBlocked
            
        }
        

    }catch(error){
        console.log(error)
        throw error
    }

}