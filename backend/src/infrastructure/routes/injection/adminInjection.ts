import JwtPassword from "../../services/jwt";
import { AdminAdapter } from "../../../controller/adminAdapter";
import { AdminUseCase } from "../../../usecaseLayer/usecase/adminUseCase";
import AdminModel from "../../database/model/adminModel/adminModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import Encrypt from "../../services/bcryptjs";
import { UserRepository } from "../../database/repository/userRepository";
import UserModel from "../../database/model/userModel";
import PaymentModel from "../../database/model/paymentModel";



const adminRepository = new AdminRepository(AdminModel)
const userRepository = new UserRepository(UserModel,PaymentModel)
const jwt = new JwtPassword()
const bcrypt = new Encrypt()
const adminusecase = new AdminUseCase(
    adminRepository,
    jwt,
    bcrypt,
    userRepository
)


const adminAdapter = new AdminAdapter(adminusecase)

export {
    adminAdapter
}









