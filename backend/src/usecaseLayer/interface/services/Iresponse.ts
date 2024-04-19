
import { IUser } from "../../../domainLayer/user";


export interface StoreData{
    _id:string;
    username:string;
    email:string
}


export interface IResponse<T = StoreData | string>{
    status:number;
    success:boolean;
    message?:string;
    data?:T
    token?:string

}