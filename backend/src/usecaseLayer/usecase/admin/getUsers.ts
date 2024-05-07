

import UserModel from "../../../infrastructure/database/model/userModel";
import { IUserResponse } from "../../interface/services/Iresponse";


export const getUser = async ():Promise<IUserResponse>=>{

    try{

        const user = await UserModel.find({}).select("-password")

        return{
            status:200,
            success:true,
            data:user

        }

    }catch(err){
        console.log(err)
        throw err
    }


}