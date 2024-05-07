import { Next,Req,Res } from "../infrastructure/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminUseCase";


export class AdminAdapter{

    private readonly adminusecases:AdminUseCase

    constructor(adminusecases:AdminUseCase){

        this.adminusecases = adminusecases

    }



    // @desc    Login the existing admin
    //route     POST api/admi/login
    async adminLogin(req: Req, res: Res, next: Next) {
        try {

            const admin = await this.adminusecases.loginAdmin(req.body)
            admin &&
                res.cookie("adminJwt", admin.token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                })

            res.status(admin.status).json({
                success: admin.success,
                data: admin.data,
                message: admin.message
            })

        } catch (error) {
            next(error)

        }
    }

    // @desc    Get all users
    //route     GET api/admin/get-users


    async getUser(req: Req, res: Res, next: Next){
        try {

            const users = await this.adminusecases.getUser()

            users &&
            res.status(users.status).json({
                success:users.success,
                data:users.data
            })
            
        } catch (error) {
            console.log(error)
            next(error)
            
        }

    }

    // @desc    block the user 
    //route     GET api/admin/block-user


    async blockUser(req: Req, res: Res, next: Next){
        try {

           
            const users = await this.adminusecases.blockUser(req.body)


            users &&
            res.status(users.status).json({
                success:users.success,
                data:users.data,
                message:users.message
            })
            
        } catch (error) {
            console.log(error)
            next(error)
            
        }

    }



}






















