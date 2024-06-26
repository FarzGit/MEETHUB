import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    value: boolean
}

const initialState: ModalState = {
    value: false,
}

export const verifyEmailSlice = createSlice({
    name: 'verifyEmailModal',
    initialState,
    reducers: {
        openVerifyEmailModal: (state) => {
            console.log(' reducer entered')
            state.value = true
        },
        closeVerifyEmailModal: (state) => {
            
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const { openVerifyEmailModal, closeVerifyEmailModal } = verifyEmailSlice.actions

export default verifyEmailSlice.reducer