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
}

export interface IUserResponse<T = IUser| IUser[]|string>{
    status: number;
    success: boolean;
    message?: string;
    data?: T|boolean|undefined|null;
    token? : string

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


export interface adminStoreData{
    _id?:string;
    email?:string;
    userId?:string;

}

export interface adminResponse<T = adminStoreData | string >{
    status:number;
    success?:boolean;
    message?:string;
    data?:T|undefined;
    token?:string;

}