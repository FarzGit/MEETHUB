import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import { IResponse } from "../../interface/services/Iresponse";
import IHashPassword from "../../interface/services/IHashPassword";

export const createUser = async (
    userRepository: IUserRepository,
    jwt: Ijwt,
    bycrypt: IHashPassword,
    username: string,
    email: string,
    password: string
): Promise<IResponse> => {
    try {


        const user = await userRepository.findUser(email)
        console.log(user)

        // if(!user){

            const hashedPassword = await bycrypt.createHash(password)
            const newUser = {
                username,
                email,
                password: hashedPassword,
            }
            const createNewUser = await userRepository.createUser(newUser)
            const token = jwt.createJWT(createNewUser._id as string, createNewUser.email,"register", createNewUser.username)
            return {
                status: 200,
                success: true,
                message: `Successfully Registered `,
                token: token,
                data: createNewUser
            }
        // }
        // throw ErrorResponse.badRequest('User already exist')




    } catch (error) {
        console.log(error)

        throw error
    }
}