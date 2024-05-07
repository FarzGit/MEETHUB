import { adminResponse, adminStoreData } from "../../interface/services/Iresponse"
import { IadminRepository } from "../../interface/repository/IadminRepository"
import Ijwt from "../../interface/services/Ijwt"
import IHashPassword from "../../interface/services/IHashPassword"



export const loginAdmin = async (
    adminRepository: IadminRepository,
    jwt: Ijwt,
    bcrypt: IHashPassword,
    email: string,
    password: string
): Promise<adminResponse> => {
    try {
        const admin = await adminRepository.findAdmin(email);

        if (admin && admin._id) {
            const checkPasswordMatch = await bcrypt.compare(password, admin.password);
            if (checkPasswordMatch) {
                const token = jwt.createJWT(admin._id, admin.email, 'admin', '_');
                const responseData: adminStoreData = {
                    _id: admin._id,
                    email: admin.email
                };
                return {
                    status: 200,
                    success: true,
                    data: responseData,
                    token: token,
                    message: `Logged in Successfully`
                };
            } else {
            
                return {
                    status: 401,
                    success: false,
                    message: "Incorrect email or password"
                };
            }
        } else {
            return {
                status: 404,
                success: false,
                message: "Admin not found"
            };
        }
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
