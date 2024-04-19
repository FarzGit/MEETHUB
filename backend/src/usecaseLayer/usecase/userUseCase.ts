import { IUserRepository } from "../interface/repository/IuserRepository";
import Ijwt from "../interface/services/Ijwt";
import { createUser } from "./user/createUser";
import IHashPassword from "../interface/services/IHashPassword";


export class UserUseCase{

    private readonly userRepository: IUserRepository
    private readonly jwt:Ijwt;
    private readonly bycrypt:IHashPassword

    constructor(
        userRepository:IUserRepository,
        jwt:Ijwt,
        bycrypt:IHashPassword
    ){
        this.userRepository = userRepository
        this.jwt = jwt
        this.bycrypt = bycrypt
    }


    //to create a user
    async createUser({
        username,
        email,
        password,
    }:{
        username:string;
        email:string;
        password:string;
    }){
        return createUser(
            this.userRepository,
            this.jwt,
            this.bycrypt,
            username,
            email,
            password
        )
    }

}