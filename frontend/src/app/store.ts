import {configureStore} from '@reduxjs/toolkit'
import signupModal from '../slices/modalSlice/signupModalSlice'


const Store = configureStore({

    reducer:{
        signupModal:signupModal

    }

})
export default Store


// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch