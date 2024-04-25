import { IUser } from "../../../domain/user";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IuserRepository";
import { StoreData } from "../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";


// This class for exporting all the single data base operation together
export class UserRepository  implements IUserRepository  {

    constructor(private readonly userModel:typeof UserModel) {}

//create new user
    async createUser(newUser: IUser): Promise<StoreData> {
        return createUser(newUser,this.userModel)
    }

    // findin the existing user
    async findUser(email: string): Promise<IUser | null> {
        return findUser(email, this.userModel);
      }

    
}