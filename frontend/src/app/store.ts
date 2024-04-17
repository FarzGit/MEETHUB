import {configureStore} from '@reduxjs/toolkit'
import signupModal from '../slices/modalSlice/signupModalSlice'
import SingInModalSlice from '../slices/modalSlice/SingInModalSlice'
import OtpSlice  from '../slices/modalSlice/otp'


const Store = configureStore({

    reducer:{
        signupModal:signupModal,
        SingInModalSlice:SingInModalSlice,
        OtpSlice:OtpSlice
       
        

    }

})
export default Store


// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch