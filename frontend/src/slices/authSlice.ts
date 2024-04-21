import { createSlice } from "@reduxjs/toolkit";


export interface UserInfo {
    _id?: string;
    email: string;
    username: string;
    password?: string;
}


interface InitialState {
    userInfo: UserInfo | null;
    registerInfo: UserInfo | null;
}


const userInfoFromLocalStorage = localStorage.getItem("userInfo");
const registerInfoFromLocalStorage = localStorage.getItem("registerInfo");

const initialState: InitialState = {
    userInfo: userInfoFromLocalStorage
        ? JSON.parse(userInfoFromLocalStorage)
        : null,

    registerInfo: registerInfoFromLocalStorage
        ? JSON.parse(registerInfoFromLocalStorage)
        : null,


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
            state.userInfo = action.payload;
            localStorage.setItem("registerInfo", JSON.stringify(action.payload));
        },

        clearRegister: (state) => {
            state.userInfo = null;
            localStorage.removeItem("registerInfo");
        },
    }
})


export const {setCredential,userLogOut,setRegister,clearRegister} = authSlice.actions

export default authSlice.reducer;