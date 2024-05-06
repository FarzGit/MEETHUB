import { IUser } from "../../../domain/user";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IuserRepository";
import { StoreData, IforgotPassword , paymentDatas } from "../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../model/userModel";
import { paymentData } from "./payment/createPayment";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { forgotPassword } from "./user/forgotPassword";
import { payment } from "./user/payment";
import PaymentModel from "../model/paymentModel";


// This class for exporting all the single data base operation together
export class UserRepository implements IUserRepository {

    constructor(
        private readonly userModel: typeof UserModel,
        private readonly paymentModel: typeof PaymentModel
    ) { }

    //create new user
    async createUser(newUser: IUser): Promise<StoreData> {
        return createUser(newUser, this.userModel)
    }

    // findin the existing user
    async findUser(email: string): Promise<IUser | null> {
        return findUser(email, this.userModel);
    }

    // forgot password 
    async forgotPassword(newPassword: IforgotPassword): Promise<StoreData> {
        return forgotPassword(newPassword, this.userModel)

    }

    // create Payment 
    async payment(email:string):Promise<StoreData>{
        return payment(email,this.userModel)
    }


    async paymentData(email:string,amount:string,transactionId:string,userId:string):Promise<paymentDatas>{
        return paymentData(email,amount,transactionId,userId,this.paymentModel)

    }

}