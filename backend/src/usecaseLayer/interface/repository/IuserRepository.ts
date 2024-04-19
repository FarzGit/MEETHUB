
import { IUser } from "../../../domainLayer/user";
import { StoreData } from "../services/Iresponse";

export interface IUserRepository{
    
    createUser(newUser:IUser):Promise<StoreData>
}