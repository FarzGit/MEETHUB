import JwtPassword from "../../services/jwt";
import { UserAdapters } from "../../../controllerLayer/userAdapter";
import { UserUseCase } from "../../../usecaseLayer/usecase/userUseCase";
import UserModel from "../../database/model/userModel";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcryptjs";


const userRepository = new UserRepository(UserModel)
const jwt = new JwtPassword()
const bycrypt = new Encrypt()
const userusecases = new UserUseCase(
    userRepository,
    jwt,
    bycrypt,
)

const userAdapter = new UserAdapters(userusecases)

export { userAdapter}