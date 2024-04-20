export interface FormSignUp {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
}



export interface MyError {
    data?: {
        message?: string;
    };
    error?: string;
}