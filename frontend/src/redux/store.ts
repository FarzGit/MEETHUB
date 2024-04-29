import { configureStore } from '@reduxjs/toolkit'
import signupModal from '../slices/modalSlice/signupModalSlice.ts.ts'
import SingInModalSlice from '../slices/modalSlice/SingInModalSlice.ts'
import OtpSlice from '../slices/modalSlice/otp.ts'
import { apiSlice } from '../slices/apiSlice.ts'
import authSlice from '../slices/authSlice.ts'
import createInterviewSlice from '../slices/modalSlice/createInterviewSlice.ts'
import verifyEmailSlice  from '../slices/modalSlice/verifyEmail.ts'
import changePasswordSlice from '../slices/modalSlice/changePassword.ts'


const Store = configureStore({

    reducer: {
        signupModal: signupModal,
        SingInModalSlice: SingInModalSlice,
        OtpSlice: OtpSlice,
        authSlice: authSlice,
        createInterviewSlice:createInterviewSlice,
        verifyEmailSlice:verifyEmailSlice,
        changePasswordSlice:changePasswordSlice





    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true

})
export default Store


// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch