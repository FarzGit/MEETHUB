import { IadminRepository } from "../../../usecaseLayer/interface/repository/IadminRepository";
import { IAdmin } from "../../../domain/admin";
import AdminModel from "../model/adminModel/adminModel";
import { findAdmin } from "./admin/findAdmin";


export class AdminRepository implements IadminRepository{



        constructor(
            private readonly adminModel:typeof AdminModel
        ){}



        async findAdmin(email:string):Promise<IAdmin|null>{
            console.log('the admin email in database repository:',email)
            return findAdmin(email,this.adminModel)
        }
        


}