import bycrypt from 'bcryptjs'
import IHashPassword from '../../usecaseLayer/interface/services/IHashPassword'



class Encrypt implements IHashPassword{
  
    // hash the password
    async  createHash(password: string): Promise<string> {
        const saltRounds = 10
        const salt = await bycrypt.genSalt(saltRounds)
        const hashedPassword = await bycrypt.hash(password,salt)
        return hashedPassword
    }

    async  compare(password: string, hashpasword: string): Promise<boolean> {

        const match = await bycrypt.compare(password,hashpasword)
        return match
        
    }
}

export default Encrypt