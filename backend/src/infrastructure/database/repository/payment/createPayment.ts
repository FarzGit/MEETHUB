
import { StoreData,IcreatePayment,paymentDatas} from "../../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../../model/userModel";
import PaymentModel from "../../model/paymentModel";
import { IPayment } from "../../../../domain/payment";




export const paymentData = async (
    email:string,
    amount:string,
    transactionId:string,
    userId:string,
    PaymentModels:typeof PaymentModel
):Promise<paymentDatas | never>=>{
    try {


        const payment  = await PaymentModels.create({email,amount,transactionId,userId})
        await payment.save()

        const responseData:paymentDatas={
            _id:payment._id,
            amount:payment.amount,
            transactionId:payment.transactionId,
            userId:payment.userId,
            email:payment.email

        }

        return responseData

        


    } catch (error) {
        throw error
        
    }
}

