
import { StoreData } from "../../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../../model/userModel";




export const payment = async (
    email:string,
    userModels:typeof UserModel
):Promise<StoreData | never>=>{
    try {

        console.log('the email isssssssssssssssssssss:',email)

        const user = await userModels.findOne({email:email})

        if(user){
            user.isPremium = true
            await user.save()
            const responseData = {
                _id:user._id,
                username:user.username,
                email:user.email
            }
            return responseData
        }
        throw new Error('Internal server error')

    } catch (error) {
        throw error
        
    }
}





