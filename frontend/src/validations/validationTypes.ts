export interface FormSignUp {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
}

export interface FormSignIn{
    email:string;
    password:string
}

export interface IUser{
    _id:string;
    email:string;
    username:string;
    isBlocked:boolean;
    isVerified:boolean;
    isPremium:boolean



}



export interface MyError {
    data?: {
        message?: string;
    };
    error?: string;
}

export interface VerifyEmail{
    email:string;
}

export interface changePassword{
    password:string;
    confirmpassword:string;
}