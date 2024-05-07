import UserModel from "../../model/userModel";



export const blockUser = async (
    _id:string,
    userModels: typeof UserModel
)=>{
    try {


        console.log( 'entered in data model block')
        const user = await userModels.findOne({_id:_id}) 
        console.log('the user in data model is :',user)
        if(user){
            user.isBlocked = !user.isBlocked
            await user.save()
            return 'Successfully Updated'
        }else{
            return null
        }

    } catch (error) {

        console.log(error)
        throw error
        
    }
}