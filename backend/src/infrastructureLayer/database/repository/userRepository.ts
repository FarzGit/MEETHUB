import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IuserRepository";
import { StoreData } from "../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";


// This class for exporting all the single data base operation together
export class UserRepository  implements IUserRepository  {

    constructor(private readonly userModel:typeof UserModel) {}

//create new user
    async createUser(newUser: IUser): Promise<StoreData> {
        return createUser(newUser,this.userModel)
    }

    
}