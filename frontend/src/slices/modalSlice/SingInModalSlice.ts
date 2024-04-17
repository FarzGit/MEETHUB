import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    value: boolean
}

const initialState: ModalState = {
    value: false,
}

export const signInModalSlice = createSlice({
    name: 'signInModal',
    initialState,
    reducers: {
        openSignInModal: (state) => {
            console.log(' reducer entered')
            state.value = true
        },
        closeSignInModal: (state) => {
            
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const { openSignInModal, closeSignInModal } = signInModalSlice.actions

export default signInModalSlice.reducer