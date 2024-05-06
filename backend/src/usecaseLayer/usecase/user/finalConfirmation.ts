

    import { IUserRepository } from "../../interface/repository/IuserRepository"
    import StripeService from "../../../infrastructure/services/stripe"
    import IStripe from "../../interface/services/IStripe"
    
    
    export const finalConfirmation = async(
        userRepository:IUserRepository,
        email:string,
        amount:string,
        transactionId:string,
        userId:string


    )=>{
        try{

            const userData = await userRepository.payment(email)
            const paymentData = await userRepository.paymentData(email,amount,transactionId,userId)

            console.log('the payment data is :',userData,paymentData)
    
    
    
        }catch(err){
            throw err
        }
    
    }