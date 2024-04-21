// import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";



export const verifyEmail = async (

    userRepository: IUserRepository,
    nodemailer: INodemailer,
    email: string,
    username: string


): Promise<IResponse> => {

    try {
        const verify = await nodemailer.sendEmailVerification(email, username)

        return {
            status: 200,
            success: true,
            message: verify
        }

    } catch (error) {
        throw error
    }




}