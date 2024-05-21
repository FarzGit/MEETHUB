import { StoreData } from "../../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../../model/userModel";



export const blockUser = async (
    _id:string,
    userModels: typeof UserModel
):Promise<StoreData|null>=>{
    try {


        console.log( 'entered in data model block')
        const user = await userModels.findOne({_id:_id}).select('-password')
        console.log('the user in data model is :',user)
        if(user){
            user.isBlocked = !user.isBlocked
            await user.save()
            return user
        }else{
            return null
        }

    } catch (error) {

        console.log(error)
        throw error
        
    }
}