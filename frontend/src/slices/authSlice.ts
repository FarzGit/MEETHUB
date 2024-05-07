import { createSlice } from "@reduxjs/toolkit";


export interface UserInfo {
    _id?: string;
    email: string;
    username: string;
    password?: string;
}

export interface AdminInfo{
    _id?:string;
    email:string;
}


interface InitialState {
    userInfo: UserInfo | null;
    registerInfo: UserInfo | null;
    forgotEmailInfo:UserInfo | null;
    adminInfo:AdminInfo|null
}


const userInfoFromLocalStorage = localStorage.getItem("userInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");
const forgotEmailInfoFromLocalStorage = localStorage.getItem("forgotEmailInfo")
const adminInfoFromLocalStorage = localStorage.getItem("adminInfo")



const initialState: InitialState = {
    userInfo: userInfoFromLocalStorage
        ? JSON.parse(userInfoFromLocalStorage)
        : null,

    registerInfo: registerInfoFromLocalStorage
        ? JSON.parse(registerInfoFromLocalStorage)
        : null,

    forgotEmailInfo: forgotEmailInfoFromLocalStorage
    ? JSON.parse(forgotEmailInfoFromLocalStorage)
    : null,


    adminInfo:adminInfoFromLocalStorage
    ?JSON.parse(adminInfoFromLocalStorage)
    : null


};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },

        userLogOut: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },

        setRegister: (state, action) => {
            state.registerInfo = action.payload;
            localStorage.setItem("registerInfo", JSON.stringify(action.payload));
        },

        clearRegister: (state) => {
            state.registerInfo = null;
            localStorage.removeItem("registerInfo");
        },
        setForgotRegister:(state,action)=>{
            state.forgotEmailInfo = action.payload;
            localStorage.setItem("forgotEmailInfo",JSON.stringify(action.payload))
        },
        clearForgotRegister:(state)=>{
            state.forgotEmailInfo = null;
            localStorage.removeItem("forgotEmailInfo");
        },
        setAdminCredential: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
        },
    }
})


export const { setCredential, userLogOut, setRegister, clearRegister,setForgotRegister,clearForgotRegister,setAdminCredential } = authSlice.actions

export default authSlice.reducer;