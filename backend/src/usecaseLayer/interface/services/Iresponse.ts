
import { IUser } from "../../../domain/user";


export interface StoreData{
    _id:string;
    username:string;
    email:string;
    isVerified?:boolean;
    isPremium?:boolean;
}


export interface IResponse<T = StoreData | string |null>{
    status:number;
    success?:boolean;
    message?:string;
    data?:T|undefined;
    token?:string;
    // clientSecret?: string | null;
    // isSuccess ?: boolean | null;
    // payment?: Payment | undefined

}

export interface IforgotPassword {
    email:string;
    password:string;
}

export interface IcreatePayment{
    _id?:string;
    email?:string;
    amount?:number;
    transactionId?:string;
    userId?:string;

}

export interface paymentDatas{
    _id?:string;
    amount?:number;
    transactionId?:string;
    userId?:string;
    email?:string;
}