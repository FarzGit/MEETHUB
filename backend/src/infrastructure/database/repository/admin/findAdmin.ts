import AdminModel from "../../model/adminModel/adminModel";


export const findAdmin = async (
    email: string,
    adminModels: typeof AdminModel
) => {


    try {


        const adminIs = await adminModels.findOne({ email: email })


        return adminIs

    } catch (error) {
        console.log(error)
        throw error

    }

}