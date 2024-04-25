
import { IUser } from "../../../domain/user";
import { StoreData } from "../services/Iresponse";

export interface IUserRepository{
    
    createUser(newUser:IUser):Promise<StoreData>
    findUser(email: string): Promise<IUser | null>;

}