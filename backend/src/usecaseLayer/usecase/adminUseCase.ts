
import { IadminRepository } from "../interface/repository/IadminRepository"
import Ijwt from "../interface/services/Ijwt"
import IHashPassword from "../interface/services/IHashPassword"
import { loginAdmin } from "./admin/loginAdmin"
import { getUser } from "./admin/getUsers"
import { IUserRepository } from "../interface/repository/IuserRepository"
import { blockUser } from "./admin/blockUser"



export class AdminUseCase{

    private readonly adminRepository:IadminRepository
    private readonly jwt:Ijwt
    private readonly bcrypt:IHashPassword
    private readonly userRepository:IUserRepository




    constructor(
        adminRepository:IadminRepository,
        jwt:Ijwt,
        bcrypt:IHashPassword,
        userRepository:IUserRepository
    ){
        this.adminRepository = adminRepository
        this.jwt = jwt
        this.bcrypt = bcrypt
        this.userRepository=userRepository

    }


    async loginAdmin({email,password}:{email:string,password:string}){
        return loginAdmin(this.adminRepository,this.jwt,this.bcrypt,email,password)
    }


    async getUser(){
        return getUser()
    }

    async blockUser({id}:{id:string}){
        console.log('asdfasd2222222222222222:',id)
        return blockUser(this.userRepository,id)
        
    }






}