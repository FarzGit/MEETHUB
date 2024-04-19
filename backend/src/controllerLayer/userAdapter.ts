import { Next, Req, Res } from '../infrastructureLayer/types/expressTypes'
import { UserUseCase } from '../usecaseLayer/usecase/userUseCase'

export class UserAdapters {
    private readonly userusecases: UserUseCase

    constructor(userusecases: UserUseCase) {
        this.userusecases = userusecases // using dependency injection to call the userusecase
    }

    // @desc  Register new user
    //route     POST api/user/singup
    //@access   Public
    async createUser(req: Req, res: Res, next: Next) {
        try {
            const newUser = await this.userusecases.createUser(req.body)
            console.log(newUser)
            newUser &&
                res.cookie('userJwt', newUser.token, {
                    httpOnly: true,
                    sameSite: 'strict', // Prevent CSRF attacks
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                })
            res.status(newUser.status).json({
                success: newUser.success,
                message: newUser.message,
                user: newUser.data
            })
        } catch (error) {
            next(error)
        }
    }
}
