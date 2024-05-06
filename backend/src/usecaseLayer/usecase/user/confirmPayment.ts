
import { IUserRepository } from "../../interface/repository/IuserRepository"
import StripeService from "../../../infrastructure/services/stripe"
import IStripe from "../../interface/services/IStripe"


export const confirmPayment = async(
    // paymentMethodId:string,
    stripe:IStripe,
    req:any
):Promise<Boolean|null>=>{
    try{

        // console.log('the request status from usecase confirmPayment',req)

        const paymentSuccess = await stripe.paymentSuccess(req)

        console.log('the payment data is :',paymentSuccess)

        if (!paymentSuccess) {
            console.log("Payment faileddddd");
            return null;
            } else {
            return true;
            }



    }catch(err){
        throw err
    }

}