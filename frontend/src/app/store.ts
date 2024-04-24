import { configureStore } from '@reduxjs/toolkit'
import signupModal from '../slices/modalSlice/signupModalSlice.ts'
import SingInModalSlice from '../slices/modalSlice/SingInModalSlice'
import OtpSlice from '../slices/modalSlice/otp'
import { apiSlice } from '../slices/apiSlice.ts'
import authSlice from '../slices/authSlice.ts'


const Store = configureStore({

    reducer: {
        signupModal: signupModal,
        SingInModalSlice: SingInModalSlice,
        OtpSlice: OtpSlice,
        authSlice: authSlice,





    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true

})
export default Store


// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch