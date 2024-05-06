
import ErrorResponse from "../../handler/errorResponse";
import Stripe from "stripe";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IResponse,IcreatePayment } from "../../interface/services/Iresponse";
import StripeService from "../../../infrastructure/services/stripe";
import IStripe from "../../interface/services/IStripe";

export const createPayment = async(
    // userRepository:IUserRepository,
    // paymentData:IcreatePayment,
    stripe:IStripe,
    amount:number,
    email:string,
    userId:string
):Promise<IResponse>=>{

    try{
            const res = await stripe.createPaymentIntent(amount,email,userId)
            
            // console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\',res)
            if(res){
                
                return {
                    status: 200,
                    success: true,
                    message: 'created',
                    data:res.data
                }
            }
            throw ErrorResponse.badRequest('Failed to create payment intent');
    }catch(error){
        throw error
    }
}